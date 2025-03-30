<script setup lang="ts">
import { Prompt, usePromptStore } from '../stores/promptStore';

const props = defineProps<{
  prompt: Prompt
}>();

const store = usePromptStore();

function toggleFavorite(event: Event) {
  event.preventDefault(); // Prevent card click from triggering
  store.toggleFavorite(props.prompt.path);
}
</script>

<template>
  <router-link 
    :to="`/prompt/${encodeURIComponent(prompt.path)}`"
    class="prompt-link"
  >
    <div class="prompt-card">
      <div class="prompt-header">
        <h3>{{ prompt.title }}</h3>
        <button 
          class="favorite-btn" 
          :class="{ active: store.isFavorite(prompt.path) }"
          @click="toggleFavorite"
        >
          ♥
        </button>
      </div>
      <p class="description">{{ prompt.description }}</p>
      <div class="meta">
        <span class="category">{{ prompt.category }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.prompt-link {
  text-decoration: none;
  color: inherit;
}

.prompt-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.prompt-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.prompt-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
  flex-grow: 1;
  margin-right: 10px;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ddd;
  padding: 0 5px;
  transition: all 0.2s ease;
  line-height: 1;
}

.favorite-btn:hover {
  transform: scale(1.1);
  color: #ff6b6b;
}

.favorite-btn.active {
  color: #ff6b6b;
}

.description {
  color: #555;
  margin-bottom: 20px;
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.8rem;
  color: #555;
}
</style>