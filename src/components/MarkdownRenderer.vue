<template>
  <div class="markdown-renderer">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>正在加载 Markdown 内容...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="loadMarkdown" class="retry-btn">重试</button>
    </div>
    
    <div 
      v-else 
      class="markdown-content"
      v-html="renderedContent"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true
})

const props = defineProps<{
  markdownContent: string
}>()

const loading = ref(false)
const error = ref('')
const renderedContent = ref('')

const renderMarkdown = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 渲染 Markdown - 处理可能的异步返回值
    const result = marked(props.markdownContent)
    const html = typeof result === 'string' ? result : await result
    renderedContent.value = html
    
    // 等待 DOM 更新后应用代码高亮
    await nextTick()
    applyCodeHighlighting()
    // 样式的加载改由 App.vue 注入
    
  } catch (err) {
    error.value = `渲染失败: ${err instanceof Error ? err.message : '未知错误'}`
    console.error('Markdown 渲染错误:', err)
  } finally {
    loading.value = false
  }
}



const applyCodeHighlighting = () => {
  // 查找所有代码块并应用高亮
  const codeBlocks = document.querySelectorAll('pre code')
  codeBlocks.forEach((block) => {
    if (block instanceof HTMLElement && !block.classList.contains('hljs')) {
      hljs.highlightElement(block)
    }
  })
}


const loadMarkdown = () => {
  renderMarkdown()
}

// 监听 markdownContent 变化
watch(() => props.markdownContent, () => {
  if (props.markdownContent) {
    renderMarkdown()
  }
}, { immediate: true })

onMounted(() => {
  if (props.markdownContent) {
    renderMarkdown()
  }
})
</script>

<style scoped>
.markdown-renderer {
  min-height: 100vh;
  padding: 1rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}

.retry-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background-color: #2980b9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-renderer {
    padding: 0.5rem;
  }
}
</style>
