import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import ProductList from '@/components/ProductList.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import CartList from '@/components/CartList.vue'
import History from '../views/History.vue'
import HistoryList from '@/components/HistoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(localStorage.access_token) {
        router.push('/product')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(localStorage.access_token) {
        router.push('/product')
      } else {
        next()
      }
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    children: [
      {
        path: '/',
        name: 'ProductList',
        component: ProductList
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if(localStorage.access_token) {
        next()
      } else {
        router.push('/login')
      }
    },
    children: [
      {
        path: '/',
        name: 'CartList',
        component: CartList
      }
    ]
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    beforeEnter: (to, from, next) => {
      if(localStorage.access_token) {
        next()
      } else {
        router.push('/login')
      }
    },
    children: [
      {
        path: '/',
        name: 'HistoryList',
        component: HistoryList
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
