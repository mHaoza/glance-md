import { createApp } from "vue";
import App from "./App.vue";

// 确保启动时背景透明
document.documentElement.style.background = 'transparent';
document.body.style.background = 'transparent';

// 创建并挂载应用
const app = createApp(App);
app.mount("#app");

// 应用挂载完成后确保透明度
app.config.globalProperties.$nextTick(() => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.background = 'transparent';
  }
});
