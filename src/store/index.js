import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    // SET_PRODUCT()
  },
  actions: {
    getProduct() {
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
      });
    },
    register(context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: payload,
      });
    },
    login(context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: payload,
      });
    },
    addItemToCart(context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/cart',
        data: payload,
      });
    },
  },
  modules: {
  },
});
