# MiSans and Twemoji

English | [简体中文](README_zh_CN.md)

Bundled MiSans Regular/Bold and Twemoji fonts for SiYuan. Enabling the plugin applies fonts to the interface and editor; disabling it removes its styles. Font loading requires no external network requests.

## Requirements and installation

- SiYuan 3.2.0 or later; desktop, mobile and browser frontends.
- This plugin has not been submitted to the marketplace. For manual installation, extract `package.zip` into `data/plugins/siyuan-ttf-MiSans_SC-and-Twemoji/` in your workspace, with `plugin.json` directly inside that directory. Enable it from the marketplace's Downloaded tab.
- Other global font/emoji plugins, CSS snippets, themes and font settings may conflict.
- Only Regular and Bold are bundled; italics are synthesized by the browser. Missing glyphs use system fallback fonts; full Traditional Chinese or other language coverage is not guaranteed.
- PDF export retains the upstream `snippetCSS` mechanism. Font embedding and emoji rendering need verification in target clients.

## Fonts and licensing

- **MiSans**: `MiSans-Regular.woff` and `MiSans-Bold.woff`, both internally identified as **4.009**. Copyright belongs to Beijing Xiaomi Mobile Software Co., Ltd. and the respective rights holders; the name tables credit Xiaomi and Hanyi. See the [official site](https://hyperos.mi.com/font/zh/) and [official repository](https://github.com/xiaomi-fonts/MiSans). Existing WOFF files are retained without glyph changes. The original download archive and conversion history are not recorded; supply the official license matching these files and provenance before a formal release.
- **Twemoji**: font version **16.0.1**; copyright Twitter, Inc and other contributors. The font declares [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The previous README identifies this [font mirror](https://mirror.whynothugo.nl/twemoji.ttf/) as its source; upstream artwork is maintained at [jdecked/twemoji](https://github.com/jdecked/twemoji). Font bytes are unchanged in this update.
- Plugin code uses the [MIT License](LICENSE). Bundled fonts have separate terms; see [third-party notices](THIRD_PARTY_NOTICES.md). This is a community project.

## Acknowledgments

Based on **[TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji](https://github.com/TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji)**, replacing HarmonyOS Sans with MiSans and retaining its font injection and PDF export approach. Thanks to TCOTC for the original implementation; the original MIT copyright notice is preserved.

Also thanks to the upstream references:

- [zuoez02/siyuan-plugin-twitter-emoji](https://github.com/zuoez02/siyuan-plugin-twitter-emoji)
- [Using the same font on mobile and desktop SiYuan (Chinese)](https://ld246.com/article/1705399357823)
- [Official SiYuan plugin sample and guidelines](https://github.com/siyuan-note/plugin-sample)

## Packaging and future release

Run `python3 scripts/package.py` to create an installable `package.zip`. GitHub Actions validates and uploads a build artifact on pushes, pull requests and manual runs. It does **not** create releases or submit marketplace applications.

Before releasing, supply the MiSans licensing materials above and verify desktop, mobile, browser and PDF rendering. Create a GitHub Release matching the manifest version and attach `package.zip`. A first marketplace listing requires a separate [bazaar submission](https://github.com/siyuan-note/bazaar#submitting-a-bazaar-package); none is made in this update.
