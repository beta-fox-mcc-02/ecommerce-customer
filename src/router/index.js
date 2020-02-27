import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Homepage from '../components/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: Homepage
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue')
      },
      {
        path: '/products/category/:category',
        name: 'Product Category',
        component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
      },
      {
        path: '/products/:id/detail',
        name: 'Product Detail',
        component: () => import(/* webpackChunkName: "product detail" */ '../views/ProductDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    children:
    [
      {
        path: '',
        component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    children:
    [
      {
        path: '',
        component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
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
