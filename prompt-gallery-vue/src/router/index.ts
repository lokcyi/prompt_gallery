import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/prompt/:path',
      name: 'prompt',
      component: () => import('../views/PromptView.vue'),
      props: route => ({ path: route.params.path })
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    }
  ]
})

export default router