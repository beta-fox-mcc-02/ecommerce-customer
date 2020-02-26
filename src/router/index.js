import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../components/Products.vue'
import Home from '../components/Home.vue'
import DetailsProduct from '../components/DetailsProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/customer',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'product/:id',
        name: 'DetailsProduct',
        component: DetailsProduct
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
