import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
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
    name: 'LoginPanel',
    component: () => import('../components/LoginPanel.vue')
  },
  {
    path: '/register',
    name: 'RegisterPanel',
    component: () => import('../components/RegisterPanel.vue')
  },
  {
    path: '/cart',
    name: 'CartPanel',
    component: () => import('../components/Cart.vue')
    // children: [
    //   {
    //     path: 'edit/:id',
    //     name: 'EditCart',
    //     component: () => import('../components/EditCart.vue')
    //   }
    // ]
  },
  {
    path: '/cart/edit/:id',
    name: 'EditCart',
    component: () => import('../components/EditCart.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'ListProduct',
        component: () => import('../components/ListProducts.vue')
      },
      {
        path: ':id',
        name: 'ItemDetail',
        component: () => import('../components/ItemDetail.vue')
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (localStorage.access_token) {
      next();
    } else {
      next({ path: '/login' });
    }
});

export default router
