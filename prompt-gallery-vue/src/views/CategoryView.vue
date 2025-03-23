<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePromptStore } from '../stores/promptStore';
import SearchBar from '../components/SearchBar.vue';
import PromptCard from '../components/PromptCard.vue';

const route = useRoute();
const store = usePromptStore();
const category = computed(() => route.params.category as string);

watch(() => route.params.category, (newCategory) => {
  if (newCategory) {
    store.setCategory(newCategory as string);
  }
});

onMounted(async () => {
  if (!store.prompts.length) {
    await store.loadPrompts();
  }
  
  if (category.value) {
    store.setCategory(category.value);
  }
});
</script>

<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h1>{{ category }}</h1>
        <router-link to="/" class="back-link">« Back to Categories</router-link>
      </div>
      <SearchBar />
    </header>
    
    <main>
      <div v-if="store.isLoading" class="loading">
        Loading...
      </div>
      <div v-else-if="store.filteredPrompts.length" class="prompt-grid">
        <PromptCard 
          v-for="prompt in store.filteredPrompts" 
          :key="prompt.path" 
          :prompt="prompt" 
        />
      </div>
      <div v-else class="no-results">
        <p>No prompts found in this category. Please try another category or use the search function.</p>
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
  text-transform: capitalize;
}

.back-link {
  color: #0066cc;
  text-decoration: none;
  font-size: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.prompt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>