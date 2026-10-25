# MiSans 字体

[English](README.md) | 简体中文

为思源笔记提供内置 MiSans 常规和粗体文字字体。启用后应用于界面和编辑器，停用后移除插件样式。字体随插件打包，运行时无需从外部网站下载。

1.0.0 版本移除 Twemoji：不再附带表情字体，也不覆盖思源的 Emoji 字体设置，表情按思源或系统原有方式显示。为保持已安装插件的更新兼容性，仓库及插件包名仍沿用原名称。

## 环境与使用

- 思源笔记 3.2.0 及以上；支持桌面端、移动端及浏览器前端。
- 当前未提交思源集市。手动安装时，将 `package.zip` 解压到工作空间的 `data/plugins/siyuan-ttf-MiSans_SC-and-Twemoji/`，确保 `plugin.json` 直接位于该目录下，再从集市的「已下载」页面启用。
- 使用时建议停用其他会覆盖全局文字字体的插件、CSS 片段。主题和自定义字体设置也可能影响显示效果。
- 仅内置常规和粗体；斜体由浏览器合成。未覆盖的字符依赖系统后备字体，不保证所有繁体字或语言字形齐全。
- PDF 导出沿用原插件的 `snippetCSS` 机制；实际字体嵌入效果需在目标客户端验证。

## 字体来源与许可

- **MiSans**：内置 `MiSans-Regular.woff` 和 `MiSans-Bold.woff`；字体内部版本均为 **4.009**。版权归北京小米移动软件有限公司等权利人所有，设计信息见字体内部记录（小米、汉仪）。官方资源：[MiSans](https://hyperos.mi.com/font/zh/)、[官方字体仓库](https://github.com/xiaomi-fonts/MiSans)。保留现有 WOFF 文件，未修改字形；原始下载包与转换过程未在仓库中记录，正式分发前需补齐与该版本对应的官方许可文件及来源记录。
- 插件代码使用 [MIT License](LICENSE)，字体资源不适用代码的 MIT 许可。详见 [第三方声明](THIRD_PARTY_NOTICES.md)。本项目由社区维护。

## 致谢

本插件基于 **[TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji](https://github.com/TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji)**（鸿蒙黑体和 Twemoji）修改，将文本字体替换为 MiSans，移除 Twemoji 功能，并沿用其字体注入和 PDF 导出支持思路。感谢 TCOTC 的原始实现，保留其 MIT 版权声明。

同时感谢原插件参考的：

- [zuoez02/siyuan-plugin-twitter-emoji](https://github.com/zuoez02/siyuan-plugin-twitter-emoji)
- [思源笔记手机端和电脑端使用同一字体 - 链滴](https://ld246.com/article/1705399357823)
- [思源官方插件示例与开发规范](https://github.com/siyuan-note/plugin-sample)

## 打包与后续发布

运行 `python3 scripts/package.py` 生成根目录可直接安装的 `package.zip`。GitHub Actions 在推送、PR 或手动运行时检查并上传构建产物，**不会自动创建 Release 或提交集市**。

正式发布前补齐上述 MiSans 授权材料，并实测桌面端、移动端、浏览器和 PDF 导出。然后创建与 `plugin.json` 版本一致的 GitHub Release 并附上 `package.zip`。首次上架还需按[官方规范](https://github.com/siyuan-note/bazaar#submitting-a-bazaar-package)单独提交集市申请；本次不执行。
