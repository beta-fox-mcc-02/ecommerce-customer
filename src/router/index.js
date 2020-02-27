import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "about" */ '../views/Product')
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/Cart'),
        beforeEnter: (to, from, next) => {
          if (!localStorage.token) next('/login')
          else {
            next()
          }
        }
      },
      {
        path: '/history',
        name: 'HistoryTransaction',
        component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next('/')
      else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next('/')
      else {
        next()
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
