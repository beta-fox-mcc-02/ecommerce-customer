import Vue from 'vue'
import Vuex from 'vuex'
import instance from '../config/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    FETCH_PRODUCT (state, payload) {
      state.products = payload
    }
  },
  actions: {
    registrationCostumer (context, payload) {
      return instance({
        method: 'post',
        url: '/register',
        data: payload
      })
    },
    loginCostumer (context, payload) {
      return instance({
        method: 'post',
        url: '/login',
        data: payload
      })
    },
    fetchProduct ({ commit }) {
      return instance({
        method: 'get',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  },
  modules: {
  }
})
