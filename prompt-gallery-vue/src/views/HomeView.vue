<script setup lang="ts">
import { onMounted } from 'vue';
import { usePromptStore } from '../stores/promptStore';
import CategoryList from '../components/CategoryList.vue';
import SearchBar from '../components/SearchBar.vue';
import HexToChineseConverter from '../components/HexToChineseConverter.vue';

const store = usePromptStore();

onMounted(async () => {
  await store.loadDirectoryStructure();
  await store.loadPrompts();
});
</script>

<template>
  <div class="container">
    <header>
      <h1>Prompt Gallery</h1>
      <SearchBar />
    </header>
    
    <main>
      <div v-if="store.isLoading" class="loading">
        Loading...
      </div>
      <div v-else>
        <HexToChineseConverter class="converter-section" />
        <h2 class="categories-heading">Categories</h2>
        <CategoryList :categories="store.categories" />
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

h1 {
  font-size: 2.5rem;
  color: #333;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.converter-section {
  margin-bottom: 40px;
}

.categories-heading {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}
</style>