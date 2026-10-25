const { Plugin } = require("siyuan");

module.exports = class MiSansPlugin extends Plugin {
    async onload() {
        this.cleanup();
        const controller = new AbortController();
        this.controller = controller;
        const base = `/plugins/${encodeURIComponent(this.name)}/`;
        try {
            const response = await fetch(`${base}style.css`, { signal: controller.signal });
            if (!response.ok) throw new Error(`Failed to load style.css: ${response.status}`);
            const css = await response.text();
            if (controller.signal.aborted || this.controller !== controller) return;
            const style = document.createElement("style");
            // SiYuan includes snippetCSS styles in PDF exports.
            style.id = `snippetCSS-${this.name}`;
            style.textContent = css.replaceAll("__PLUGIN_BASE__", base);
            this.style = style;
            document.head.appendChild(style);
            if (document.fonts?.load) {
                await Promise.allSettled([
                    document.fonts.load('400 16px "MiSans"'),
                    document.fonts.load('700 16px "MiSans"'),
                ]);
            }
        } catch (error) {
            if (!controller.signal.aborted) console.error("MiSans:", error);
        }
    }

    cleanup() {
        this.controller?.abort();
        this.controller = undefined;
        this.style?.remove();
        this.style = undefined;
    }

    onunload() {
        this.cleanup();
    }

    uninstall() {
        this.cleanup();
    }
};
