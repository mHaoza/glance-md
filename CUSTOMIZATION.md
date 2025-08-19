# Glance MD 自定义指南

## 📝 概述

Glance MD 支持通过外部文件来自定义 Markdown 内容和样式。用户可以在应用数据目录中创建 `data.md` 和 `style.css` 文件来自定义应用的外观和内容。

## 📁 应用数据目录位置

### Windows
```
%APPDATA%\glance-md\
```
例如：`C:\Users\用户名\AppData\Roaming\glance-md\`

### macOS
```
~/Library/Application Support/glance-md/
```

### Linux
```
~/.local/share/glance-md/
```

## 🎨 自定义 Markdown 内容

### 创建 data.md 文件

1. 在应用数据目录中创建 `data.md` 文件
2. 使用标准 Markdown 语法编写内容
3. 保存文件并重启应用

### data.md 示例

```markdown
# 我的个人文档

这是我的自定义 Markdown 内容。

## 项目介绍

这是一个使用 Tauri2 + Vue3 构建的 Markdown 预览应用。

### 功能特性

- ✅ 实时 Markdown 渲染
- ✅ 代码语法高亮
- ✅ 自定义样式支持
- ✅ 响应式设计
- ✅ 暗色/亮色主题

## 代码示例

```javascript
function hello() {
  console.log("Hello, World!");
  return "Welcome to my document!";
}
```

## 表格示例

| 项目 | 状态 | 描述 |
|------|------|------|
| 功能A | ✅ | 已完成 |
| 功能B | 🚧 | 开发中 |
| 功能C | 📋 | 计划中 |

## 引用

> 这是一个重要的引用内容。

**粗体文本** 和 *斜体文本* 用于强调。

---

*文档结束*
```

## 🎨 自定义样式

### 创建 style.css 文件

1. 在应用数据目录中创建 `style.css` 文件
2. 使用 CSS 语法编写样式
3. 保存文件并重启应用

### style.css 示例

```css
/* 自定义 Markdown 内容样式 */
.markdown-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem;
  line-height: 1.8;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  color: #2c3e50;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
.markdown-content h1 {
  color: #e74c3c;
  border-bottom: 3px solid #e74c3c;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.markdown-content h2 {
  color: #3498db;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
}

.markdown-content h3 {
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

/* 段落样式 */
.markdown-content p {
  margin-bottom: 1.2rem;
  text-align: justify;
  line-height: 1.8;
}

/* 链接样式 */
.markdown-content a {
  color: #3498db;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.markdown-content a:hover {
  color: #2980b9;
  border-bottom-color: #2980b9;
}

/* 代码样式 */
.markdown-content code {
  background-color: #f8f9fa;
  color: #e83e8c;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: 'Fira Code', 'Consolas', monospace;
}

.markdown-content pre {
  background-color: #2c3e50;
  color: #ecf0f1;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.markdown-content pre code {
  background: none;
  color: inherit;
  padding: 0;
  border-radius: 0;
}

/* 表格样式 */
.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.markdown-content th {
  background-color: #3498db;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

.markdown-content td {
  padding: 12px;
  border-bottom: 1px solid #ecf0f1;
}

.markdown-content tr:nth-child(even) {
  background-color: #f8f9fa;
}

.markdown-content tr:hover {
  background-color: #e8f4fd;
}

/* 引用块样式 */
.markdown-content blockquote {
  border-left: 4px solid #3498db;
  background-color: #f8f9fa;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #555;
}

/* 列表样式 */
.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* 水平分割线 */
.markdown-content hr {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3498db, transparent);
  margin: 2rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-content {
    padding: 1.5rem;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
  
  .markdown-content h1 {
    font-size: 2rem;
  }
  
  .markdown-content h2 {
    font-size: 1.5rem;
  }
  
  .markdown-content h3 {
    font-size: 1.3rem;
  }
}

/* 暗色主题 */
@media (prefers-color-scheme: dark) {
  .markdown-content {
    background: #1a1a1a;
    color: #e0e0e0;
  }
  
  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3 {
    color: #fff;
  }
  
  .markdown-content code {
    background-color: #2c2c2c;
    color: #ff6b6b;
  }
  
  .markdown-content blockquote {
    background-color: #2c2c2c;
    color: #ccc;
  }
  
  .markdown-content tr:nth-child(even) {
    background-color: #2c2c2c;
  }
  
  .markdown-content tr:hover {
    background-color: #3c3c3c;
  }
  
  .markdown-content td {
    border-bottom-color: #3c3c3c;
  }
}
```

## 🔧 使用步骤

### 1. 找到应用数据目录

根据您的操作系统，找到对应的应用数据目录：

- **Windows**: 按 `Win + R`，输入 `%APPDATA%`，回车，然后进入 `glance-md` 文件夹
- **macOS**: 在 Finder 中按 `Cmd + Shift + G`，输入 `~/Library/Application Support/glance-md/`
- **Linux**: 在终端中运行 `cd ~/.local/share/glance-md/`

### 2. 创建自定义文件

在应用数据目录中创建以下文件：

- `data.md` - 自定义 Markdown 内容
- `style.css` - 自定义样式

### 3. 重启应用

保存文件后，重启 Glance MD 应用即可看到效果。

## 📋 注意事项

1. **文件编码**: 请确保文件使用 UTF-8 编码保存
2. **文件权限**: 确保应用有读取文件的权限
3. **文件格式**: 
   - `data.md` 必须使用 Markdown 语法
   - `style.css` 必须使用有效的 CSS 语法
4. **重启应用**: 修改文件后需要重启应用才能看到效果
5. **备份**: 建议备份您的自定义文件

## 🎯 高级自定义

### 自定义代码高亮主题

您可以在 `style.css` 中添加自定义的代码高亮样式：

```css
/* 自定义代码高亮 */
.hljs {
  background: #f6f8fa !important;
  color: #24292e !important;
}

.hljs-keyword {
  color: #d73a49 !important;
}

.hljs-string {
  color: #032f62 !important;
}

.hljs-comment {
  color: #6a737d !important;
  font-style: italic;
}
```

### 自定义字体

```css
.markdown-content {
  font-family: 'Your Custom Font', 'Microsoft YaHei', sans-serif;
}
```

### 自定义颜色主题

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --background-color: #ffffff;
  --text-color: #2c3e50;
}

.markdown-content {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

## 🆘 故障排除

### 文件不生效

1. 检查文件是否在正确的目录中
2. 检查文件名是否正确（`data.md` 和 `style.css`）
3. 检查文件编码是否为 UTF-8
4. 重启应用

### 样式不显示

1. 检查 CSS 语法是否正确
2. 检查选择器是否正确
3. 检查是否有语法错误

### 内容不显示

1. 检查 Markdown 语法是否正确
2. 检查文件是否为空
3. 检查文件编码

## 📞 获取帮助

如果遇到问题，请：

1. 检查控制台错误信息
2. 确认文件路径和权限
3. 尝试使用示例文件内容
4. 提交 Issue 到项目仓库

---

享受自定义您的 Glance MD 体验！🎉
