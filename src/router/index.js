import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bootcamps',
    name: 'bootcamps',
    component: () => import('@/views/Bootcamps.vue')
  },
  {
    path: '/bootcamp/:id',
    name: 'bootcamp',
    component: () => import('@/views/Bootcamp.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('@/views/Courses.vue')
  },
  {
    path: '/course/:id',
    name: 'course',
    component: () => import('@/views/CoursePage.vue')
  }
]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('bootcamp_token') === null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
