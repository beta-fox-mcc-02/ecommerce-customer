import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: ':id',
        name: 'Products',
        component: () => import('../views/Main.vue'),
        children: [
          {
            path: ':itemId/checkout',
            name: 'Checkout',
            component: () => import('../views/Checkout.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/registration',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
