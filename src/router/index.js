import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:slug',
      component: () => import('@/layout/Home.vue'),
      name: 'home'
    }
  ]
})

export default router
