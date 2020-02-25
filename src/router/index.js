import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Login from '../views/Login.vue'
import UserLogin from '../views/UserLogin.vue'
import Admin from '../views/Admin.vue'
import Cart from '../components/Cart.vue'
import Product from '../components/Product.vue'
import ProductList from '../components/ProductList.vue'
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
        path: '/product/:id',
        name: 'product',
        component: Product
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
      },
      {
        path: 'admin',
        name: 'adminLogin',
        component: AdminLogin
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
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
