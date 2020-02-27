import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserLogin from '../views/UserLogin.vue'
import Cart from '../components/Cart.vue'
import Product from '../components/Product.vue'
import ProductList from '../components/ProductList.vue'
import About from '../views/About.vue'
import History from '../components/History.vue'
// import store from '../store/index.js'

Vue.use(VueRouter)

// import './custom.scss'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'product list',
        component: ProductList
      },
      {
        path: 'product',
        name: 'product',
        beforeEnter: (to, from, next) => {
          // console.log(store.state.isLogin)
          next('/')
        }

      },
      {
        path: '/product/:id',
        name: 'product',
        component: Product,
        beforeEnter: (to, from, next) => {
          // console.log(store.state.isLogin)
          if (localStorage.token) {
            next()
          } else next('/login')
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: [
      {
        path: '',
        name: 'loginUser',
        component: UserLogin
      }
    ],
    beforeEnter: (to, from, next) => {
      // console.log(store.state.isLogin)
      if (localStorage.token) {
        next('/')
      } else next()
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: About,
    children: [
      {
        path: '',
        name: 'cartTable',
        component: Cart
      },
      {
        path: 'history',
        name: 'history',
        component: History
      }
    ],
    beforeEnter: (to, from, next) => {
      // console.log(store.state.isLogin)
      if (localStorage.token) {
        next()
      } else next('/login')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
