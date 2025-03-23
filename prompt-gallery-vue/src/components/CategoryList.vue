<script setup lang="ts">
import { PromptCategory } from '../stores/promptStore';
import { useRouter } from 'vue-router';

defineProps<{
  categories: PromptCategory[]
}>();

const router = useRouter();

function handleCategoryClick(category: PromptCategory) {
  if (category.isDirectory) {
    router.push(`/category/${category.name}`);
  }
}
</script>

<template>
  <div class="category-list">
    <div v-for="category in categories" :key="category.name" class="category-item" @click="handleCategoryClick(category)">
      <div class="category-card">
        <h3>{{ category.name }}</h3>
        <span class="prompt-count" v-if="category.children">
          {{ category.children.length }} prompts
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.category-item {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  background-color: #ffe4e1; /* Light pink */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-card {
  background-color: #fff0f5; /* Lavender blush */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #333;
}

.prompt-count {
  color: #666;
  font-size: 0.9rem;
}
</style>