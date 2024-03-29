# TDP Aiart UI

[![TDP Aiart UI Builder](https://github.com/opentdp/tdp-aiart-ui/actions/workflows/release.yml/badge.svg)](https://github.com/opentdp/tdp-aiart-ui/actions/workflows/release.yml)

[TDP Aiart](https://github.com/opentdp/tdp-aiart) 的前端组件

## 开发说明

### 启动开发服务

首先，运行后端接口服务。然后，在项目目录运行 `serve.bat` 或 `./serve.sh`

*注意*：数据展示需要调用后端接口，所以此项目无法独立使用。可下载稳定版 [二进制可执行程序](https://aiart.opentdp.org/files) 作为后端配合开发工作。

### 提交代码时请使用下面标识

- `feat` 新功能（feature）
- `fix` 错误修复
- `docs` 文档更改（documentation）
- `style` 格式（不影响代码含义的更改，空格、格式、缺少分号等）
- `refactor` 重构（即不是新功能，也不是修补bug的代码变动）
- `perf` 优化（提高性能的代码更改）
- `test` 测试（添加缺失的测试或更正现有测试）
- `chore` 构建过程或辅助工具的变动
- `revert` 还原以前的提交

### 打包前端代码

在项目目录运行  `build.bat` 或 `./build.sh`

## 开发工具配置

项目编辑器推荐使用 `vscode`，并设置代码格式化插件如下

```json
{
    "[css]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[scss]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[vue]": {
        "editor.defaultFormatter": "Vue.volar"
    }
}
```

## 其他

License [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.txt)

Copyright (c) 2022 - 2023 OpenTDP
