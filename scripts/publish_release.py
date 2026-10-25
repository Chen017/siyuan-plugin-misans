"""Publish the checked package, then delete only explicitly requested old releases."""
import hashlib
import json
import os
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
os.chdir(root)
request = json.loads(Path('.release/request.json').read_text())
manifest = json.loads(Path('plugin.json').read_text())
assert request['version'] == manifest['version']
tag = request['tag']
assert tag == 'v' + manifest['version']
old_tags = request.get('remove_releases', [])
assert tag not in old_tags
repo = os.environ['GITHUB_REPOSITORY']
# Repository IDs remain stable across a rename.
assert os.environ['GITHUB_REPOSITORY_ID'] == '1192298311'
commit = os.environ['GITHUB_SHA']

def gh(*args):
    return subprocess.run(['gh', *args, '--repo', repo], check=True, text=True, capture_output=True).stdout

# Re-running this request is safe: update the same release rather than creating duplicates.
existing = subprocess.run(['gh', 'release', 'view', tag, '--repo', repo, '--json', 'tagName'], capture_output=True)
if existing.returncode:
    gh('release', 'create', tag, '--draft', '--target', commit,
       '--title', 'MiSans for SiYuan 1.0.0', '--notes-file', '.release/notes.md')
# Refresh the existing 1.0.0 source tag when republishing the renamed package.
# Refuse to move a tag changed to an unexpected commit by somebody else.
if request.get('refresh_tag_from'):
    ref = json.loads(subprocess.run(
        ['gh', 'api', f'repos/{repo}/git/ref/tags/{tag}'],
        check=True, text=True, capture_output=True).stdout)
    assert ref['object']['type'] == 'commit'
    assert ref['object']['sha'] in (request['refresh_tag_from'], commit), 'Tag changed unexpectedly'
    if ref['object']['sha'] != commit:
        subprocess.run(['gh', 'api', '--method', 'PATCH', f'repos/{repo}/git/refs/tags/{tag}',
                        '-f', f'sha={commit}', '-F', 'force=true'], check=True)
gh('release', 'upload', tag, 'package.zip', '--clobber')
release = json.loads(gh('release', 'view', tag, '--json', 'assets'))
assert any(x['name'] == 'package.zip' and x['size'] == Path('package.zip').stat().st_size
           for x in release['assets']), 'Uploaded package missing or size mismatch'
gh('release', 'edit', tag, '--draft=false', '--prerelease=false', '--latest',
   '--title', 'MiSans for SiYuan 1.0.0', '--notes-file', '.release/notes.md')
# Deletion starts only after the new release and its installable package are published.
for old_tag in old_tags:
    result = subprocess.run(['gh', 'release', 'view', old_tag, '--repo', repo], capture_output=True)
    if result.returncode == 0:
        gh('release', 'delete', old_tag, '--yes')
print('Published:', tag)
print('package.zip SHA-256:', hashlib.sha256(Path('package.zip').read_bytes()).hexdigest())
