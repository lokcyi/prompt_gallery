<script setup lang="ts">
import { createPinia } from 'pinia'

// Create and use Pinia store
const pinia = createPinia();
</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}
</style>
