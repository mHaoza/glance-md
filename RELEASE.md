# 发布流程说明

本项目使用GitHub Actions自动化发布流程，当推送版本标签时会自动构建并发布应用。

## 发布步骤

### 1. 本地发布准备

确保你的工作目录是干净的，然后运行发布脚本：

```bash
# 发布新版本（例如：1.0.0）
pnpm release 1.0.0
```

这个命令会：
- 更新 `package.json` 和 `src-tauri/Cargo.toml` 中的版本号
- 提交版本更新
- 创建并推送版本标签（如 `v1.0.0`）
- 推送到远程仓库

### 2. 自动构建和发布

当版本标签推送到GitHub后，GitHub Actions会自动：

1. **Windows构建**：在Windows平台上构建应用
2. **生成安装包**：
   - Windows: MSI安装包和便携版exe文件
3. **创建GitHub Release**：自动创建发布页面
4. **上传安装包**：将Windows安装包上传到Release页面
5. **生成发布说明**：自动生成包含下载链接的发布说明

## 构建产物

每次发布会生成以下文件：

### Windows
- `glance-md-{version}-windows-x64.msi` - MSI安装包
- `glance-md-{version}-windows-x64-portable.exe` - 便携版exe文件

## 工作流文件

GitHub Actions工作流文件位于 `.github/workflows/release.yaml`，包含：

- **触发条件**：推送以 `v` 开头的标签时触发
- **构建平台**：仅支持Windows平台
- **依赖安装**：自动安装Windows所需的系统依赖
- **应用构建**：使用Tauri构建Windows桌面应用
- **发布上传**：自动创建Release并上传Windows安装包

## 注意事项

1. **权限要求**：确保GitHub仓库有足够的权限来创建Release和上传文件
2. **构建时间**：Windows构建通常需要5-10分钟
3. **存储空间**：构建产物会占用一定的GitHub存储空间
4. **版本号格式**：建议使用语义化版本号（如：1.0.0、1.1.0、2.0.0等）

## 故障排除

如果发布失败，请检查：

1. 版本标签格式是否正确（必须以 `v` 开头）
2. 工作目录是否干净（没有未提交的更改）
3. GitHub Actions日志中的具体错误信息
4. 仓库权限设置是否正确

### 调试构建产物

如果遇到构建产物路径问题，可以使用调试脚本：

```bash
# 先构建应用
pnpm tauri build

# 然后检查构建产物
pnpm check-build
```

这将显示所有构建产物的确切路径和文件大小。

## 手动发布

如果需要手动发布，可以：

1. 在GitHub仓库页面点击 "Releases"
2. 点击 "Create a new release"
3. 选择或创建版本标签
4. 手动上传构建好的安装包文件
