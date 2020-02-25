import Vue from 'vue'
import Vuex from 'vuex'
import api from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    errors: [],
    message: '',
    isLoading: null,
    isAuthenticated: null,
    isLoadingAuthenticated: null
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ERRORS (state, payload) {
      state.errors = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_AUTHENTICATED (state, payload) {
      state.isAuthenticated = payload
    },
    SET_LOADING_AUTHENTICATION (state, payload) {
      state.isLoadingAuthenticated = payload
    }
  },
  actions: {
    getBestDealProduct ({ commit }, limit) {
      commit('SET_LOADING', true)
      return api({
        method: 'GET',
        url: '/products?limit=' + limit
      })
    },
    checkAuthenticated ({ commit }, payload) {
      commit('SET_AUTHENTICATED', false)
      commit('SET_LOADING_AUTHENTICATION', true)
      return api({
        method: 'GET',
        url: '/users'
      })
    }
  },
  modules: {
  }
})
