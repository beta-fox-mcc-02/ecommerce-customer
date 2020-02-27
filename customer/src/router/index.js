import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "register page" */ '../views/RegisterPage.vue')
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: () => import(/* webpackChunkName: "product page" */ '../views/Products.vue'),
    children: [
      {
        path: ':id',
        name: 'ProductDetail',
        component: () => import(/* webpackChunkName: "detail page" */ '../views/Detail.vue')
      }
    ]
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "cart page" */ '../views/Cart.vue')
  },
  {
    path: '/transaction',
    name: 'TransactionPage',
    component: () => import(/* webpackChunkName: "transaction page" */ '../views/Transaction.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
