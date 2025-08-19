# 发布示例

本文档展示如何使用自动化发布流程发布新版本。

## 发布前准备

1. **检查发布配置**
   ```bash
   git status
   ```

2. **确保工作目录干净**
   ```bash
   git status
   ```

3. **更新CHANGELOG.md**（可选）
   - 记录新功能和修复
   - 更新版本号

## 发布新版本

### 示例：发布 v1.0.0

```bash
# 发布新版本
pnpm release 1.0.0
```

### 执行过程

1. **版本更新**
   ```
   ✅ 更新 package.json: 0.1.0 -> 1.0.0
   ✅ 更新 Cargo.toml: 0.1.0 -> 1.0.0
   ✅ 更新 tauri.conf.json: 0.1.0 -> 1.0.0
   ```

2. **Git操作**
   ```
   ✅ 提交版本更新
   ✅ 创建标签 v1.0.0
   ✅ 推送到远程仓库
   ```

3. **GitHub Actions触发**
   ```
   🚀 自动触发构建流程
   📦 Windows构建开始
   ```

## 构建产物

发布完成后，GitHub Release页面将包含：

### Windows
- `glance-md-1.0.0-windows-x64.msi` (安装包)
- `glance-md-1.0.0-windows-x64-portable.exe` (便携版)

## 发布说明示例

```markdown
## 新版本发布

### 下载

- **Windows**: 下载 [MSI安装包](https://github.com/your-repo/releases/download/v1.0.0/glance-md-1.0.0-windows-x64.msi) 或 [便携版](https://github.com/your-repo/releases/download/v1.0.0/glance-md-1.0.0-windows-x64-portable.exe)

### 更新内容

请查看 [CHANGELOG.md](https://github.com/your-repo/blob/main/CHANGELOG.md) 了解详细更新内容。
```

## 故障排除

### 常见问题

1. **版本标签已存在**
   ```bash
   # 删除本地标签
   git tag -d v1.0.0
   # 删除远程标签
   git push origin :refs/tags/v1.0.0
   ```

2. **构建失败**
   - 检查GitHub Actions日志
   - 确认依赖项正确安装
   - 验证Rust工具链版本

3. **权限问题**
   - 确认GitHub仓库权限设置
   - 检查Actions权限配置

### 手动回滚

如果需要回滚版本：

```bash
# 删除标签
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# 回滚提交
git reset --hard HEAD~1
git push --force origin main

# 重新发布
pnpm release 0.1.0
```

## 最佳实践

1. **版本号规范**
   - 使用语义化版本号 (MAJOR.MINOR.PATCH)
   - 遵循 [SemVer](https://semver.org/) 规范

2. **发布前检查**
   - 确保工作目录干净
   - 确保所有测试通过
   - 更新文档和CHANGELOG

3. **发布后验证**
   - 检查GitHub Release页面
   - 验证下载链接可用
   - 测试安装包功能

4. **自动化改进**
   - 定期更新依赖项
   - 优化构建时间
   - 改进Windows构建流程
