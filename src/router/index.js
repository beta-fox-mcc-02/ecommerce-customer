import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeComponent from '../components/HomeComponent'
import Login from '../components/Login'
import Register from '../components/Register'
import Categories from '../components/Categories'
import Shoes from '../components/Shoes'
import AllShoes from '../components/AllShoeComp'
import OneShoe from '../components/OneShoe'
import Cart from '../components/Cart'
import About from '../components/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'HomeComponent',
        component: HomeComponent
      },
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
          if (localStorage.user_token) {
            router.push('/')
          } else {
            next()
          }
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next) => {
          if (localStorage.user_token) {
            router.push('/')
          } else {
            next()
          }
        }
      },
      {
        path: '/shoes',
        name: 'Shoes',
        component: Shoes,
        children: [
          {
            path: '',
            name: 'AllShoes',
            component: AllShoes
          },
          {
            path: ':id',
            name: 'OneShoe',
            component: OneShoe
          }
        ]
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        beforeEnter: (to, from, next) => {
          if (localStorage.user_token) {
            next()
          } else {
            router.push('/login')
          }
        }
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
