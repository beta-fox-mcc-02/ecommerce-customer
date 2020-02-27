import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import list from '@/components/listProduct.vue'
import cart from '@/components/Cart.vue'
import category from '@/components/category.vue'
import login from '@/components/login.vue'
import register from '@/components/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: '',
        component: category
      },
      {
        path: 'list',
        name: 'list',
        component: list
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: cart,
        beforeEnter: (to, from, next) => {
          if (!localStorage.token) {
            router.push('/login')
          } else {
            next()
          }
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        router.push('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'name',
    component: register,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        router.push('/')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
