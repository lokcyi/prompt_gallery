<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { usePromptStore } from '../stores/promptStore';
import SearchBar from '../components/SearchBar.vue';
import PromptCard from '../components/PromptCard.vue';

const store = usePromptStore();

// Get only favorited prompts
const favoritePrompts = computed(() => 
  store.prompts.filter(prompt => store.isFavorite(prompt.path))
);

onMounted(async () => {
  if (!store.prompts.length) {
    await store.loadPrompts();
  }
});
</script>

<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h1>Favorites</h1>
        <router-link to="/" class="back-link">« Back to Categories</router-link>
      </div>
      <SearchBar />
    </header>
    
    <main>
      <div v-if="store.isLoading" class="loading">
        Loading...
      </div>
      <div v-else>
        <div v-if="favoritePrompts.length" class="prompt-grid">
          <PromptCard 
            v-for="prompt in favoritePrompts" 
            :key="prompt.path" 
            :prompt="prompt" 
          />
        </div>
        <div v-else class="no-results">
          <p>No favorite prompts yet. Click the heart icon on any prompt to add it to your favorites.</p>
        </div>
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