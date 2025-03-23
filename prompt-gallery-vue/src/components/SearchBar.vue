<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePromptStore } from '../stores/promptStore';

const store = usePromptStore();
const router = useRouter();
const searchInput = ref('');
const searchQuery = computed(() => store.searchQuery);

function handleSearch() {
  if (searchInput.value.trim() !== '') {
    router.push({
      name: 'search',
      query: { q: searchInput.value }
    });
  }
}
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchInput"
      type="text"
      placeholder="Search prompts..."
      @keyup.enter="handleSearch"
    />
    <button @click="handleSearch">Search</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  width: 350px;
}

input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #0066cc;
}

button {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0055aa;
}
</style>