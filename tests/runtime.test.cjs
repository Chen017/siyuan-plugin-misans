const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'index.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

function harness({ fetch, loadFont = () => Promise.resolve([]) } = {}) {
    const styles = new Set();
    const timers = new Map();
    const warnings = [];
    let timerId = 0;
    const context = {
        module: { exports: {} },
        require: () => ({ Plugin: class {} }),
        AbortController,
        console: { error: (...args) => warnings.push(args), warn: (...args) => warnings.push(args) },
        setTimeout: (fn, delay) => { timers.set(++timerId, { fn, delay }); return timerId; },
        clearTimeout: id => timers.delete(id),
        fetch: fetch || (async () => ({ ok: true, text: async () => css })),
        document: {
            createElement: () => ({ remove() { styles.delete(this); } }),
            head: { appendChild: style => styles.add(style) },
            fonts: { load: loadFont },
        },
    };
    vm.runInNewContext(source, context);
    const plugin = new context.module.exports();
    plugin.name = 'siyuan-ttf-MiSans_SC-and-Twemoji';
    return { plugin, styles, timers, warnings };
}

const bounded = promise => Promise.race([
    promise,
    new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Startup blocked')), 500); timer.unref(); }),
]);

test('font downloads never block startup; unload and uninstall are idempotent', async () => {
    const h = harness({ loadFont: () => new Promise(() => {}) });
    await bounded(h.plugin.onload());
    assert.equal(h.styles.size, 1);
    const style = [...h.styles][0];
    assert.match(style.id, /^snippetCSS-/);
    assert(!style.textContent.includes('__PLUGIN_BASE__'));
    assert(style.textContent.includes('/plugins/' + h.plugin.name + '/MiSans-Regular.woff'));
    assert.equal(h.timers.size, 0);
    h.plugin.onunload();
    h.plugin.uninstall();
    assert.equal(h.styles.size, 0);
});

test('rejected font preloads do not reject startup', async () => {
    const h = harness({ loadFont: () => Promise.reject(new Error('offline')) });
    await h.plugin.onload();
    assert.equal(h.styles.size, 1);
    h.plugin.onunload();
});

test('a late stylesheet response cannot restore a disabled plugin', async () => {
    let finish;
    const h = harness({ fetch: () => new Promise(resolve => { finish = resolve; }) });
    const pending = h.plugin.onload();
    h.plugin.onunload();
    finish({ ok: true, text: async () => css });
    await pending;
    assert.equal(h.styles.size, 0);
    assert.equal(h.timers.size, 0);
});

test('timeout aborts a stalled stylesheet request and completes startup', async () => {
    let signal;
    const h = harness({ fetch: (_, options) => new Promise((_, reject) => {
        signal = options.signal;
        signal.addEventListener('abort', () => reject(new Error('aborted')));
    }) });
    const pending = h.plugin.onload();
    const timer = [...h.timers.values()][0];
    assert.equal(timer.delay, 3000);
    timer.fn();
    await bounded(pending);
    assert(signal.aborted);
    assert.equal(h.styles.size, 0);
    assert.equal(h.timers.size, 0);
    assert.equal(h.warnings.length, 1);
});

test('failed stylesheet loads do not attach incomplete styles', async () => {
    const h = harness({ fetch: async () => ({ ok: false, status: 403 }) });
    await h.plugin.onload();
    assert.equal(h.styles.size, 0);
    assert.equal(h.timers.size, 0);
    assert.equal(h.warnings.length, 1);
});

test('an old request cannot overwrite the styles or timer of a new activation', async () => {
    const requests = [];
    const h = harness({ fetch: () => new Promise(resolve => requests.push(resolve)) });
    const first = h.plugin.onload();
    const second = h.plugin.onload();
    requests[0]({ ok: true, text: async () => css });
    await first;
    assert.equal(h.styles.size, 0);
    assert.equal(h.timers.size, 1);
    requests[1]({ ok: true, text: async () => css });
    await second;
    assert.equal(h.styles.size, 1);
    assert.equal(h.timers.size, 0);
    h.plugin.onunload();
});
