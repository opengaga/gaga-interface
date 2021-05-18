import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'BACT'
    },
    component: Home
  },
  {
    path: '/browse',
    name: 'Browse',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/browse/index.vue')
  },
  {
    path: '/create',
    name: 'Create',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/create/index.vue')
  },
  {
    path: '/single',
    name: 'Single',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/single/index.vue')
  },
  {
    path: '/multiple',
    name: 'Multiple',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/multiple/index.vue')
  },
  {
    path: '/collection',
    name: 'Collection',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/collection/index.vue')
  },
  {
    path: '/connect',
    name: 'Connect',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/connect/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/activity/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/profile/index.vue')
  },

  {
    path: '/bidInfo/:address/:tokenId/:seller?',
    name: 'BidInfo',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/bidInfo/index.vue')
  },
  {
    path: '/myItems/:address?',
    name: 'MyItems',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/myItems/index.vue')
  },
  {
    path: '/fllowing',
    name: 'Following',
    meta: {
      title: 'BACT'
    },
    component: () => import('@/views/fllowing/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
