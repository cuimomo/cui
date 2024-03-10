import { createRouter, createWebHistory } from 'vue-router'
import UsEr from '@/views/UsEr.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/user'
    },
    {
      path:'/user',
      name:'user',
      component:UsEr
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
})

export default router
