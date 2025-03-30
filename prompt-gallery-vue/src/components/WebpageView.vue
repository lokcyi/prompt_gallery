<script setup lang="ts">
import { ref, onMounted } from 'vue';

// const webUrl = ref("https://www.google.com/?&output=embed&hl=zh-TW&gl=TW&gws_rd=ssl&authuser=0&safe=active");
const webUrl = ref("https://www.artificialintelligence-news.com/");
const iframeError = ref(false);

const handleIframeError = () => {
  iframeError.value = true;
  console.error('Failed to load webpage in iframe due to X-Frame-Options or other security policies');
};

const openInNewTab = () => {
  window.open(webUrl.value, '_blank', 'noopener,noreferrer');
};
</script>

<template>
  <div class="webpage-container">
    <div v-if="iframeError" class="error-message">
      <h3>無法在頁面內顯示此網站</h3>
      <p>由於網站的安全性設定 (X-Frame-Options)，此網頁無法被嵌入顯示。</p>
      <div class="error-actions">
        <button @click="openInNewTab" class="primary-button">
          在新視窗開啟網頁
        </button>
      </div>
    </div>
    <iframe 
      v-else
      :src="webUrl"
      class="webpage-frame"
      @error="handleIframeError"
      allow="fullscreen"
    ></iframe>
  </div>
</template>

<style scoped>
.webpage-container {
  width: 100%;
  height: 80vh;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.webpage-frame {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

.error-message {
  padding: 2rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.error-message h3 {
  color: #333;
  margin: 0;
}

.error-message p {
  color: #666;
  margin: 0;
}

.error-message a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.error-message a:hover {
  background-color: #45a049;
}

.error-actions {
  margin-top: 1rem;
}

.primary-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #45a049;
}
</style>