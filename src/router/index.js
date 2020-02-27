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
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/store',
    component: () => import(/* webpackChunkName: "about" */ '../views/Store.vue'),
    children: [
      {
        path: '',
        name: 'Store',
        component: () => import(/* webpackChunkName: "about" */ '../components/AllProducts.vue'),

      },
      {
        path: ':productId',
        name: 'detail product',
        component: () => import(/* webpackChunkName: "about" */ '../components/ProductDetail.vue'),
      }

    ]
  },
  {
    path: '/mycart',
    name: 'MyCart',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyCart.vue')
  },
  {
    path: '/history',
    name: 'Purchased history',
    component: () => import(/* webpackChunkName: "about" */ '../views/Purchased.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
