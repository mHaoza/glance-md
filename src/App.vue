<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import MarkdownRenderer from "./components/MarkdownRenderer.vue";
import { invoke } from "@tauri-apps/api/core";

const markdownContent = ref("");
const isLoaded = ref(false);

// 加载 Markdown 内容（通过后端命令，读取/初始化与 exe 同目录的文件）
const loadMarkdownFile = async () => {
  // 通过 tauri invoke 从后端读取或初始化文件
  let content = "";
  try {
    const payload = await invoke('read_or_init_files');
    // payload: { markdown, style, base_dir, created_md, created_css }
    const { markdown, style } = payload as any;
    content = markdown as string;
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

onMounted(() => {
  loadMarkdownFile();
});
</script>

<template>
  <main class="app-main" :class="{ 'loaded': isLoaded }">
    <MarkdownRenderer :markdown-content="markdownContent" />
  </main>
</template>
