import Vue from 'vue'
import Vuex from 'vuex'
import api from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    errors: [],
    message: '',
    isLoading: null,
    isLoadingAddToCart: null,
    isLoadingCategories: null,
    isAuthenticated: null,
    isLoadingAuthenticated: null,
    user: {}
  },
  mutations: {
    SET_LOADING_ADD_TO_CART (state, payload) {
      state.isLoadingAddToCart = payload
    },
    SET_LOADING_CATEGORIES (state, payload) {
      state.isLoadingCategories = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
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
    updateCart ({ commit }, payload) {
      commit('SET_LOADING_ADD_TO_CART', true)
      return api({
        method: 'PUT',
        url: '/carts/' + payload.cart_id,
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        },
        data: {
          product_id: payload.product_id,
          quantity: payload.quantity
        }
      })
    },
    addToCart ({ commit }, payload) {
      commit('SET_LOADING_ADD_TO_CART', true)
      return api({
        method: 'POST',
        url: '/carts',
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        },
        data: {
          product_id: payload.product_id,
          quantity: payload.quantity
        }
      })
    },
    fetchCategories ({ commit }) {
      commit('SET_LOADING_CATEGORIES', true)
      return api({
        method: 'GET',
        url: '/categories'
      })
    },
    fetchProducts ({ commit }, category) {
      commit('SET_LOADING', true)
      if (!category) {
        return api({
          method: 'GET',
          url: '/products'
        })
      } else {
        return api({
          method: 'GET',
          url: '/products/category/' + category
        })
      }
    },
    getBestDealProduct ({ commit }, limit) {
      commit('SET_LOADING', true)
      return api({
        method: 'GET',
        url: '/products?limit=' + limit
      })
    },
    findUser ({ commit }) {
      return api({
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        },
        url: '/users'
      })
    },
    checkAuthenticated ({ commit }, payload) {
      commit('SET_AUTHENTICATED', false)
      commit('SET_LOADING_AUTHENTICATION', true)
      return api({
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        },
        url: '/users'
      })
    },
    register ({ commit }, payload) {
      commit('SET_LOADING', true)
      return api({
        method: 'POST',
        url: '/users',
        data: {
          first_name: payload.first_name,
          last_name: payload.last_name,
          username: payload.username,
          password: payload.password,
          phone_number: payload.phone_number,
          email: payload.email
        }
      })
    },
    login ({ commit }, payload) {
      commit('SET_LOADING', true)
      return api({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    }
  },
  modules: {
  }
})
