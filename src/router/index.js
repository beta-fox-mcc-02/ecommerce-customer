import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'
import OrderDetail from '../views/OrderDetail.vue'

Vue.use(VueRouter)

// function isAuthenticated(to, from, next) {
//   if (store.getters.isAuthenticated) {
//     next()
//   } else {
//     next({
//       path: '/login'
//     })
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
