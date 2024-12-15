import { createRouter, createWebHistory } from 'vue-router'
import BookList from '@/components/BookList.vue'
import AddBook from '@/components/AddBook.vue'
import AppCart from '@/components/AppCart.vue'
import AppAbout from '../components/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: BookList,
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    },
    {
      path: '/form/:id?',
      name: 'form',
      component: AddBook
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart
    },
  ],
})

export default router
