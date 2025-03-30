<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePromptStore } from '../stores/promptStore';
import CategoryList from '../components/CategoryList.vue';
import SearchBar from '../components/SearchBar.vue';
import HexToChineseConverter from '../components/HexToChineseConverter.vue';

const store = usePromptStore();
const currentFeature = ref('categories'); // 'categories' or 'converter'

const switchFeature = (feature: string) => {
  currentFeature.value = feature;
};

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
      <div class="feature-switcher">
        <button 
          :class="{ active: currentFeature === 'categories' }" 
          @click="switchFeature('categories')"
        >
          Categories
        </button>
        <button 
          :class="{ active: currentFeature === 'converter' }"
          @click="switchFeature('converter')"
        >
          Hex to Chinese
        </button>
      </div>

      <div v-if="store.isLoading" class="loading">
        Loading...
      </div>
      <div v-else>
        <HexToChineseConverter v-if="currentFeature === 'converter'" class="converter-section" />
        <template v-else>
          <h2 class="categories-heading">Categories</h2>
          <CategoryList :categories="store.categories" />
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  width: 65vw;
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

.feature-switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
}

.feature-switcher button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-switcher button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.feature-switcher button:hover:not(.active) {
  background-color: #f5f5f5;
}
</style>