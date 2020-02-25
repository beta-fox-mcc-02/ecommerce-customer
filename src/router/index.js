import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    children: [
      {
        path: '',
        name: 'ProductPage',
        component: () => import('../views/Home/ProductPage')
      },
      {
        path: 'cart',
        name: 'CartPage',
        component: () => import('../views/Home/CartPage')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === 'CartPage' && from.name === 'ProductPage') {
    if (!localStorage.access_token) {
      next('/register');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
