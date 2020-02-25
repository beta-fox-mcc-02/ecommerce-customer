import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    children: [
      {
        path: '',
        name: 'ProductList',
        component: () => import('@/components/ProductList.vue')
      }
    ]
  },
  {
    path: '/users',
    name: 'AuthPage',
    component: () => import('../views/AuthPage.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/profiles',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/carts',
    name: 'Carts',
    component: () => import('../views/Carts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
