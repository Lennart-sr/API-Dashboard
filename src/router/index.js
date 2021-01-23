import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        name: 'Analystics',
        path: '/',
        component: () => import('@/components/Analytics.vue')
      },
      {
        name: 'User',
        path: 'user',
        component: () => import('@/components/User.vue')
      },
      {
        name: 'Warnings',
        path: 'warnings',
        component: () => import('@/components/Warnings.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes
})

export default router
