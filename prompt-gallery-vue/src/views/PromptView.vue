<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePromptStore } from '../stores/promptStore';
import { marked } from 'marked';
import SearchBar from '../components/SearchBar.vue';
import type { Tokens, Renderer } from 'marked';
type Code = Tokens.Code;

const props = defineProps<{
  path?: string
}>();

const route = useRoute();
const router = useRouter();
const store = usePromptStore();
const htmlContent = ref('');

// Function to copy text to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
};

const loadPrompt = async (path: string) => {
  await store.loadPromptContent(decodeURIComponent(path));
  if (store.selectedPrompt) {
    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code;
    
    renderer.code = function(this: Renderer, code: Code) {
      if (code.lang === 'plaintext') {
        return `
          <div class="code-block-wrapper">
            <button class="copy-button" onclick="(() => {
              const text = this.parentElement.querySelector('pre').textContent;
              navigator.clipboard.writeText(text).catch(console.error);
              this.textContent = 'Copied!';
              setTimeout(() => this.textContent = 'Copy', 2000);
            })()">Copy</button>
            ${originalCodeRenderer.call(this, code)}
          </div>
        `;
      }
      return originalCodeRenderer.call(this, code);
    };

    marked.setOptions({ renderer });
    const parsed = await Promise.resolve(marked.parse(store.selectedPrompt.code));
    htmlContent.value = parsed;
  }
};

watch(() => props.path, (newPath) => {
  if (newPath) {
    loadPrompt(newPath);
  }
});

onMounted(() => {
  const path = props.path || route.params.path as string;
  if (path) {
    loadPrompt(path);
  } else {
    router.push('/');
  }
});
</script>

<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h1 v-if="store.selectedPrompt">{{ store.selectedPrompt.title }}</h1>
        <router-link to="/" class="back-link">« Back to Categories</router-link>
      </div>
      <SearchBar />
    </header>
    
    <main>
      <div v-if="store.isLoading" class="loading">
        Loading...
      </div>
      <div v-else-if="store.selectedPrompt" class="prompt-content">
        <div class="prompt-description">
          <p>{{ store.selectedPrompt.description }}</p>
        </div>
        <div class="markdown-content" v-html="htmlContent"></div>
        <div class="prompt-meta">
          <span>Category: {{ store.selectedPrompt.category }}</span>
          <span>Path: {{ store.selectedPrompt.path }}</span>
        </div>
      </div>
      <div v-else class="error">
        Prompt not found.
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.header-content {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.back-link {
  color: #0066cc;
  text-decoration: none;
  font-size: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #cc0000;
}

.prompt-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.prompt-description {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.1rem;
  line-height: 1.6;
}

.markdown-content {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
}

.prompt-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

/* Markdown content styling */
:deep(.markdown-content h1) {
  font-size: 1.8rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

:deep(.markdown-content h2) {
  font-size: 1.5rem;
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
}

:deep(.markdown-content h3) {
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
}

:deep(.markdown-content code) {
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

:deep(.markdown-content pre) {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
}

:deep(.code-block-wrapper) {
  position: relative;
  margin: 1em 0;
}

:deep(.copy-button) {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0.8;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

:deep(.copy-button:hover) {
  opacity: 1;
  background-color: #f0f0f0;
}
</style>