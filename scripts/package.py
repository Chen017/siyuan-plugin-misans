"""Validate release metadata and package explicitly selected runtime files."""
import json
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'plugin.json').read_text(encoding='utf-8'))
assert manifest['name'] == 'siyuan-ttf-MiSans_SC-and-Twemoji'
assert manifest['url'] == f"https://github.com/Chen017/{manifest['name']}"
assert re.fullmatch(r'\d+\.\d+\.\d+', manifest['version']), 'Invalid version'
for key in ('displayName', 'description', 'readme'):
    assert manifest[key].get('default') and manifest[key].get('zh-CN'), key
    assert 'zh_CN' not in manifest[key], 'Use BCP 47 language tags'
files = [
    'index.js', 'index.css', 'style.css', 'plugin.json',
    'LICENSE', 'THIRD_PARTY_NOTICES.md', 'Twemoji/LICENSE-CC-BY-4.0.txt',
    'MiSans-Regular.woff', 'MiSans-Bold.woff', 'Twemoji/Twemoji-16.0.1.ttf',
    *manifest['readme'].values(), manifest['icon'], manifest['preview'],
]
for filename in files:
    assert (ROOT / filename).is_file(), f'Missing file: {filename}'
css = (ROOT / 'style.css').read_text(encoding='utf-8')
for filename in re.findall(r'__PLUGIN_BASE__([^\s\'"()]+)', css):
    assert filename in files, f'Unpackaged font: {filename}'
with ZipFile(ROOT / 'package.zip', 'w', ZIP_DEFLATED) as archive:
    for filename in sorted(set(files)):
        archive.write(ROOT / filename, filename)
with ZipFile(ROOT / 'package.zip') as archive:
    assert archive.testzip() is None
print(f"Validated and packaged {manifest['name']} {manifest['version']}: {len(set(files))} files")
