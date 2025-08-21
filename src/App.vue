<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import MarkdownRenderer from "./components/MarkdownRenderer.vue";
import { invoke } from "@tauri-apps/api/core";

const markdownContent = ref("");
const isLoaded = ref(false);
let fileCheckInterval: number | null = null;
let lastMarkdownContent = "";
let lastStyleContent = "";

// 加载 Markdown 内容（通过后端命令，读取/初始化与 exe 同目录的文件）
const loadMarkdownFile = async () => {
  // 通过 tauri invoke 从后端读取或初始化文件
  let content = "";
  try {
    const payload = await invoke('read_or_init_files');
    // payload: { markdown, style, base_dir, created_md, created_css }
    const { markdown, style } = payload as any;
    content = markdown as string;
    lastMarkdownContent = content;
    lastStyleContent = style as string;
    
    // 动态注入样式（覆盖内置样式）
    let styleElement = document.getElementById('external-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'external-styles';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = style as string;
  } catch (fileError) {
    content = `===md加载失败===`;
  }
  
  markdownContent.value = content;
  
  // 内容加载完成后，延迟添加loaded类以显示背景
  await nextTick();
  setTimeout(() => {
    isLoaded.value = true;
  }, 200);
};

// 检查文件变化
const checkFileChanges = async () => {
  try {
    const payload = await invoke('read_files');
    const { markdown, style } = payload as any;
    
    // 检查 markdown 内容是否变化
    if (markdown !== lastMarkdownContent) {
      markdownContent.value = markdown as string;
      lastMarkdownContent = markdown as string;
      console.log('Markdown content updated');
    }
    
    // 检查样式内容是否变化
    if (style !== lastStyleContent) {
      let styleElement = document.getElementById('external-styles');
      if (styleElement) {
        styleElement.textContent = style as string;
      }
      lastStyleContent = style as string;
      console.log('Style content updated');
    }
  } catch (error) {
    console.error('Failed to check file changes:', error);
  }
};

// 启动文件变化检查
const startFileWatcher = () => {
  // 每2秒检查一次文件变化
  fileCheckInterval = window.setInterval(checkFileChanges, 2000);
};

// 停止文件变化检查
const stopFileWatcher = () => {
  if (fileCheckInterval !== null) {
    clearInterval(fileCheckInterval);
    fileCheckInterval = null;
  }
};

onMounted(() => {
  loadMarkdownFile();
  // 延迟启动文件监听，确保初始加载完成
  setTimeout(() => {
    startFileWatcher();
  }, 1000);
});

onUnmounted(() => {
  stopFileWatcher();
});
</script>

<template>
  <main class="app-main" :class="{ 'loaded': isLoaded }">
    <MarkdownRenderer :markdown-content="markdownContent" />
  </main>
</template>
