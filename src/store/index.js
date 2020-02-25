import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasLogin: false,
    products: []
  },
  mutations: {
    HAS_LOGIN(state) {
      state.hasLogin = true;
    },
    LOGOUT(state) {
      state.hasLogin = false;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    registerCustomer(context, payload) {
      return axios({
        method: 'POST',
        url: '/register',
        data: payload
      });
    },
    loginCustomer(context, payload) {
      return axios({
        method: 'POST',
        url: '/login',
        data: payload
      });
    },
    fetchAllProducts() {
      return axios({
        method: 'GET',
        url: '/products'
      });
    }
  },
  modules: {
  }
});
