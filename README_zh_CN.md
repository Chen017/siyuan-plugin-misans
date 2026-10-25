<div align="center">

<img src="assets/misans-wordmark.png" alt="MiSans" width="280">

# MiSans for SiYuan

让思源笔记的界面与正文，使用 MiSans。

![Version](https://img.shields.io/badge/version-1.0.0-171717?style=flat-square)
![SiYuan](https://img.shields.io/badge/SiYuan-%E2%89%A5%203.8.4-2563eb?style=flat-square)
![Code license](https://img.shields.io/badge/code-MIT-16a34a?style=flat-square)

[English](README.md) · **简体中文**

[**下载安装包**](https://github.com/Chen017/siyuan-ttf-MiSans_SC-and-Twemoji/releases/latest) · [MiSans 官网](https://hyperos.mi.com/font/zh/) · [Issues](https://github.com/Chen017/siyuan-ttf-MiSans_SC-and-Twemoji/issues)

</div>

---

一个轻量的社区字体插件。内置 MiSans 常规与粗体，启用即生效，停用即恢复思源原有样式。

> 本项目由 Chen017 维护，基于 TCOTC 的鸿蒙字体插件修改，与小米、汉仪及思源官方无隶属或背书关系。

## 功能

| 功能 | 说明 |
| --- | --- |
| 界面与正文 | MiSans 优先用于全局界面和编辑器文字 |
| 常规与粗体 | 内置两个字重，普通文字从 400 开始，保留正文加粗与表头字重继承 |
| 本地加载 | 字体随安装包提供，无需从外部字体网站加载 |
| 新版思源适配 | 适配独立的全局、编辑器字体栈，声明发布服务资源 |
| 快速启停 | 后台预加载字体，停用时移除样式并取消待完成的样式请求 |

不附带 Twemoji，不修改思源的 Emoji 或代码字体变量。仅提供常规和粗体，斜体由浏览器合成；字体未覆盖的字符使用系统后备字体。

## 安装

**要求：思源笔记 3.8.4 或以上。** 当前未上架思源集市。

1. 从 [Releases](https://github.com/Chen017/siyuan-ttf-MiSans_SC-and-Twemoji/releases/latest) 下载 **`package.zip`**，不要下载 GitHub 自动生成的 Source code 压缩包。
2. 将安装包解压到工作空间的以下位置：

   ```text
   data/plugins/siyuan-ttf-MiSans_SC-and-Twemoji/
   ├── plugin.json
   ├── index.js
   ├── style.css
   ├── MiSans-Regular.woff
   └── MiSans-Bold.woff
   ```

3. 在思源「设置 → 集市 → 已下载 → 插件」中启用。必要时重启思源以刷新插件列表。

更新时建议先停用插件，备份旧目录后替换文件，再重新启用。若从旧版升级，请删除旧目录中的 `Twemoji/` 文件夹；新版安装包不再包含它。

<details>
<summary>为什么目录名里还有 Twemoji？</summary>

为保持已有安装的包名与仓库地址兼容，沿用历史名称。当前 1.0.0 版本只提供 MiSans 文字字体，不包含表情字体。

</details>

## 使用提示

- **字体冲突：** 其他全局字体插件、主题或 CSS 片段可能影响效果，建议避免同时覆盖同一字体设置。
- **发布服务：** 需要在思源中允许本插件用于发布服务，访客才能加载已声明的样式与字体资源。
- **PDF 导出：** 保留上游 `snippetCSS` 导出机制；字体嵌入及实际显示仍需在目标客户端验证。
- **兼容性验证：** 已对照思源 3.8.8、上游插件 2.3.1 源码检查，并通过 6 项生命周期回归测试。尚未完成所有桌面端、移动端和浏览器的视觉实测。

## 开发与打包

无需安装 npm 依赖，使用 Node.js 和 Python 3：

```sh
node --check index.js
node --test tests/*.test.cjs
python3 scripts/package.py
```

输出为仓库根目录的 `package.zip`。CI 会运行检查并上传构建产物。GitHub Release 与思源集市上架是两件事，本仓库不会自动提交集市申请。

## 字体与许可

本插件使用 **MiSans**。内置 `MiSans-Regular.woff`、`MiSans-Bold.woff` 的内部版本均为 **4.009**，字体版权归北京小米移动软件有限公司等权利人所有，内部记录署名小米与汉仪。现有 WOFF 文件保持不变；原始下载包和转换过程未在历史仓库中保存。

- [MiSans 官方网站](https://hyperos.mi.com/font/zh/) · [官方字体仓库](https://github.com/xiaomi-fonts/MiSans)
- [MiSans 字体知识产权许可协议](https://hyperos.mi.com/font-download/MiSans字体知识产权许可协议.pdf)
- 插件代码采用 [MIT License](LICENSE)；字体遵循其独立许可，详见 [第三方声明](THIRD_PARTY_NOTICES.md)。

## 致谢

本插件基于 **[TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji](https://github.com/TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji)** 修改，替换文字字体、移除 Twemoji，并参考其新版思源字体栈、字重继承及 PDF 导出适配。保留原作者 Jeffrey Chen 的 MIT 版权声明。

同时感谢：

- [zuoez02/siyuan-plugin-twitter-emoji](https://github.com/zuoez02/siyuan-plugin-twitter-emoji)
- [思源笔记手机端和电脑端使用同一字体](https://ld246.com/article/1705399357823)
- [思源官方插件示例与开发规范](https://github.com/siyuan-note/plugin-sample)
