import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'CategoryButton',
        component: () => { return import(/* webpackChunkName: "CategoryButton" */ '../views/Home/components/CategoryButton.vue') }
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "register" */ '../views/Register/Register.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
