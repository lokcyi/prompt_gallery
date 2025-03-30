<script setup lang="ts">
import { usePromptStore } from '../stores/promptStore';
import type { Prompt } from '../stores/promptStore';

const props = defineProps<{
  prompt: Prompt
}>();

const store = usePromptStore();
</script>

<template>
  <div class="prompt-card-container">
    <button 
      class="favorite-button" 
      :class="{ active: store.isFavorite(prompt.path) }"
      @click.prevent="store.toggleFavorite(prompt.path)"
      aria-label="Toggle favorite"
    >
      <svg viewBox="0 0 24 24" class="heart-icon">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
    <router-link 
      :to="`/prompt/${encodeURIComponent(prompt.path)}`"
      class="prompt-link"
    >
      <div class="prompt-card">
        <h3>{{ prompt.title }}</h3>
        <p class="description">{{ prompt.description }}</p>
        <div class="meta">
          <span class="category">{{ prompt.category }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.prompt-card-container {
  position: relative;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.1);
}

.heart-icon {
  width: 24px;
  height: 24px;
  fill: #ddd;
  transition: fill 0.2s ease;
}

.favorite-button.active .heart-icon {
  fill: #ff4d4d;
}

.favorite-button:hover .heart-icon {
  fill: #ff6666;
}

.prompt-link {
  text-decoration: none;
  color: inherit;
  display: block;
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

h3 {
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #333;
  padding-right: 40px;
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