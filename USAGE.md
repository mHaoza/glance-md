# Glance MD 使用说明

## 🎯 应用简介

Glance MD 是一个基于 Tauri2 + Vue3 构建的 Markdown 预览应用，提供美观的 Markdown 渲染界面和丰富的功能特性。

## 🚀 快速上手

### 1. 启动应用

```bash
# 开发模式
pnpm tauri dev

# 或者构建后运行
pnpm tauri build
```

### 2. 查看效果

应用启动后会自动显示示例 Markdown 内容，包括：

- 📝 各种 Markdown 语法示例
- 🎨 代码高亮效果
- 📊 表格展示
- 📋 列表和引用
- 🔗 链接和图片

## 📝 自定义内容

### 方法一：修改内置内容

编辑 `src/App.vue` 文件中的 `markdownContent` 变量：

```javascript
const markdownContent = ref(`# 你的标题

你的 Markdown 内容...
`);
```

### 方法二：读取外部文件（待实现）

未来版本将支持读取外部 Markdown 文件：

```javascript
// 计划中的功能
const content = await readTextFile("your-file.md");
```

## 🎨 自定义样式

### 修改样式文件

编辑 `src/style.css` 文件来自定义 Markdown 的显示效果：

```css
/* 修改标题样式 */
.markdown-content h1 {
  color: #your-color;
  font-size: 2.5rem;
}

/* 修改代码块样式 */
.markdown-content pre {
  background-color: #your-bg-color;
  border-radius: 8px;
}
```

### 样式特性

- **响应式设计**: 自动适配不同屏幕尺寸
- **主题支持**: 自动适配系统暗色/亮色主题
- **代码高亮**: 支持多种编程语言
- **现代化设计**: 优雅的视觉效果和动画

## 🔧 功能特性

### 支持的 Markdown 语法

| 语法 | 示例 | 效果 |
|------|------|------|
| 标题 | `# 标题` | 大标题 |
| 粗体 | `**文本**` | **粗体文本** |
| 斜体 | `*文本*` | *斜体文本* |
| 代码 | `` `代码` `` | `代码` |
| 链接 | `[文本](URL)` | [链接文本](URL) |
| 图片 | `![alt](URL)` | 图片 |
| 列表 | `- 项目` | 无序列表 |
| 表格 | `\|列1\|列2\|` | 表格 |

### 代码高亮支持

应用支持以下编程语言的语法高亮：

- JavaScript/TypeScript
- Python
- CSS/SCSS
- HTML
- JSON
- SQL
- Rust
- Go
- Java
- C/C++
- 等等...

## 📱 响应式设计

应用在不同设备上的表现：

### 桌面端
- 最大宽度 900px
- 居中显示
- 完整功能

### 移动端
- 自适应宽度
- 优化字体大小
- 触摸友好

## 🌙 主题支持

### 自动主题切换

应用会根据系统设置自动切换主题：

- **亮色主题**: 白色背景，深色文字
- **暗色主题**: 深色背景，浅色文字

### 主题特性

- 平滑过渡动画
- 代码高亮主题适配
- 保持可读性

## 🔄 重新加载

点击右上角的"重新加载"按钮可以刷新内容：

- 重新渲染 Markdown
- 重新应用样式
- 重新高亮代码

## 🛠️ 开发模式

### 热重载

在开发模式下，修改代码会自动重新加载：

```bash
pnpm tauri dev
```

### 调试

- 使用浏览器开发者工具调试前端
- 查看控制台日志
- 检查网络请求

## 📦 构建部署

### 开发构建

```bash
pnpm tauri dev
```

### 生产构建

```bash
pnpm tauri build
```

构建产物位于 `src-tauri/target/release/` 目录。

## 🐛 故障排除

### 常见问题

1. **应用无法启动**
   - 检查 Node.js 版本 (需要 18+)
   - 检查 Rust 环境
   - 重新安装依赖

2. **样式不生效**
   - 检查 `style.css` 文件是否存在
   - 检查 CSS 语法是否正确
   - 清除浏览器缓存

3. **代码高亮不工作**
   - 检查 marked.js 和 highlight.js 是否正确安装
   - 检查代码块语法是否正确

### 获取帮助

- 查看控制台错误信息
- 检查网络连接
- 提交 Issue 到项目仓库

## 🎉 使用技巧

1. **快捷键**: 使用 `Ctrl+R` 重新加载
2. **全屏模式**: 双击标题栏最大化
3. **复制代码**: 点击代码块右上角复制按钮
4. **主题切换**: 修改系统主题设置

---

享受使用 Glance MD 的 Markdown 预览体验！ ✨
