<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { usePromptStore } from '../stores/promptStore';
import CategoryList from '../components/CategoryList.vue';
import SearchBar from '../components/SearchBar.vue';
import HexToChineseConverter from '../components/HexToChineseConverter.vue';
import WebpageView from '../components/WebpageView.vue';
import { useRouter } from 'vue-router';

const store = usePromptStore();
const router = useRouter();
const currentFeature = ref('categories'); // 'categories', 'converter', or 'webpage'

const switchFeature = (feature: string) => {
  if (feature === 'favorites') {
    router.push('/favorites');
  } else {
    currentFeature.value = feature;
  }
};

const favoriteCount = computed(() => {
  return store.prompts.filter(prompt => store.isFavorite(prompt.path)).length;
});

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
        <button 
          :class="{ active: currentFeature === 'webpage' }"
          @click="switchFeature('webpage')"
        >
          AI News
        </button>
        <button 
          @click="switchFeature('favorites')"
          class="favorite-button"
        >
          <span>Favorites</span>
          <span v-if="favoriteCount" class="favorite-count">{{ favoriteCount }}</span>
        </button>
      </div>

      <div v-if="store.isLoading" class="loading">
        Loading...
      </div>
      <div v-else>
        <HexToChineseConverter v-if="currentFeature === 'converter'" class="converter-section" />
        <WebpageView v-else-if="currentFeature === 'webpage'" />
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
  margin: 0;
  color: #333;
}

.feature-switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.feature-switcher button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.feature-switcher button:hover {
  background-color: #e0e0e0;
  color: #333;
}

.feature-switcher button.active {
  background-color: #333;
  color: white;
}

.favorite-button {
  display: flex;
  align-items: center;
  gap: 6px;
}

.favorite-count {
  background-color: #ff4d4d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.categories-heading {
  font-size: 1.8rem;
  margin: 20px 0;
  color: #333;
}

.loading {
  text-align: center;
  margin-top: 40px;
  color: #666;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
  }
  
  .feature-switcher {
    flex-wrap: wrap;
  }
}
</style>