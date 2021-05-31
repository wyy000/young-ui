import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import document from './document'
import test from './test'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    component: () => import('../views/test/index.vue'),
    children: test,
  },
  {
    path: '/documents',
    component: () => import('../views/documents/index.vue'),
    children: document,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect: () => '/documents',
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
