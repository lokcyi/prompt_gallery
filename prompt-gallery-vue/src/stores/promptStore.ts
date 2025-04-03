import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

const API_URL = '/api';

export interface PromptCategory {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: PromptCategory[];
}

export interface Prompt {
  title: string;
  description: string;
  code: string;
  path: string;
  category: string;
}

export const usePromptStore = defineStore('prompt', () => {
  const categories = ref<PromptCategory[]>([]);
  const prompts = ref<Prompt[]>([]);
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const selectedPrompt = ref<Prompt | null>(null);
  const isLoading = ref(false);
  const favorites = ref<Set<string>>(new Set());

  // Load favorites from localStorage on store initialization
  if (typeof window !== 'undefined') {
    const savedFavorites = localStorage.getItem('promptFavorites');
    if (savedFavorites) {
      favorites.value = new Set(JSON.parse(savedFavorites));
    }
  }
  
  const filteredPrompts = computed(() => {
    if (!searchQuery.value) {
      return selectedCategory.value 
        ? prompts.value.filter(p => p.category === selectedCategory.value)
        : prompts.value;
    }
    
    const query = searchQuery.value.toLowerCase();
    return prompts.value.filter(prompt => 
      prompt.title.toLowerCase().includes(query) || 
      prompt.description.toLowerCase().includes(query) ||
      prompt.code.toLowerCase().includes(query)
    );
  });

  // Add methods for managing favorites
  function toggleFavorite(promptPath: string) {
    if (favorites.value.has(promptPath)) {
      favorites.value.delete(promptPath);
    } else {
      favorites.value.add(promptPath);
    }
    // Save to localStorage
    localStorage.setItem('promptFavorites', JSON.stringify([...favorites.value]));
  }

  function isFavorite(promptPath: string): boolean {
    return favorites.value.has(promptPath);
  }

  function clearAllFavorites() {
    favorites.value.clear();
    localStorage.setItem('promptFavorites', JSON.stringify([]));
  }

  async function loadDirectoryStructure() {
    try {
      isLoading.value = true;
      const response = await axios.get(`${API_URL}/directory`);
      categories.value = response.data;
    } catch (error) {
      console.error('Error loading directory structure', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadPrompts() {
    try {
      isLoading.value = true;
      const response = await axios.get(`${API_URL}/prompts`);
      prompts.value = response.data;
    } catch (error) {
      console.error('Error loading prompts', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadPromptContent(path: string) {
    try {
      isLoading.value = true;
      const response = await axios.get(`${API_URL}/prompt?path=${encodeURIComponent(path)}`);
      selectedPrompt.value = response.data;
    } catch (error) {
      console.error('Error loading prompt content', error);
      selectedPrompt.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  function setCategory(category: string) {
    selectedCategory.value = category;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  return {
    categories,
    prompts,
    filteredPrompts,
    searchQuery,
    selectedCategory,
    selectedPrompt,
    isLoading,
    favorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    loadDirectoryStructure,
    loadPrompts,
    loadPromptContent,
    setCategory,
    setSearchQuery
  };
});