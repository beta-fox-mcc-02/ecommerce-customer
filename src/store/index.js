import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasLogin: false
  },
  mutations: {
    HAS_LOGIN(state) {
      state.hasLogin = true;
    },
    LOGOUT(state) {
      state.hasLogin = false;
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
    }
  },
  modules: {
  }
});
