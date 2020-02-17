import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/question',
        component: () => import('@/views/question/index.vue')
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue')
      }
    ]
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user/profile.vue')
  },
  {
    path: '/user/chat',
    component: () => import('@/views/user/chat.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue') // 登录
  },
  {
    path: '/article',
    component: () => import('@/views/article/index.vue') // 文章详情
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue') // 搜索中心
  },
  {
    path: '/search/result',
    component: () => import('@/views/search/result.vue') // 搜索结果
  }
]

const router = new VueRouter({
  routes
})

export default router
