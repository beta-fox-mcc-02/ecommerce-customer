import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import M from 'materialize-css'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLogin: false,
    isLogin: false,
    categories: [],
    products: [],
    product: {},
    categoryId: null,
    showCart: false,
    carts: []
  },
  mutations: {
    loginTrigger (state) {
      state.showLogin = !state.showLogin
    },

    CART_TRIGGER (state) {
      state.showCart = !state.showCart
    },

    LOGIN_CHECK (state) {
      if (localStorage.token) state.isLogin = true
      else state.isLogin = false
    },

    GET_CATEGORIES (state, payload) {
      state.categories = payload
    },

    GET_PRODUCTS (state, payload) {
      state.products = payload
    },

    GET_ONE_PRODUCT (state, payload) {
      state.product = payload
    },

    GET_CARTS (state, payload) {
      state.carts = payload
    },

    SHOW_CARTS (state) {
      state.showCart = !state.showCart
    },

    PRODUCTS_FILTER (state, payload) {
      state.categoryId = payload
    },

    SUCCESS (state, payload) {
      M.toast({
        html: `${payload}`,
        displayLength: 3000
      })
    },

    ERROR (state, payload) {
      M.toast({
        html: `${payload}`,
        displayLength: 3000,
        classes: 'red'
      })
    }
  },
  actions: {
    fetchCategories ({ commit }) {
      Axios({
        url: 'http://localhost:3000/categories',
        method: 'GET'
      })
        .then(({ data }) => commit('GET_CATEGORIES', data))
        .catch(err => {
          commit('ERROR', `${err}`)
        })
    },

    fetchProducts ({ commit }) {
      Axios({
        url: 'http://localhost:3000/products',
        method: 'GET'
      })
        .then(({ data }) => commit('GET_PRODUCTS', data))
        .catch(err => {
          commit('ERROR', `${err}`)
        })
    },

    fetchOneProduct ({ commit }, payload) {
      const { productId } = payload
      Axios({
        url: `http://localhost:3000/products/${productId}`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('GET_ONE_PRODUCT', data)
        })
        .catch(err => {
          commit('ERROR', `${err}`)
        })
    },

    fetchCarts ({ commit }) {
      const token = localStorage.token
      Axios({
        url: 'http://localhost:3000/carts',
        method: 'GET',
        headers: { token }
      })
        .then(({ data }) => {
          commit('GET_CARTS', data)
        })
        .catch(err => {
          commit('ERROR', `${err}`)
        })
    },

    addCart (context, payload) {
      const token = localStorage.token
      return Axios({
        url: 'http://localhost:3000/carts',
        method: 'POST',
        data: {
          productId: payload.productId,
          quantity: payload.quantity,
          total_price: payload.total_price
        },
        headers: { token }
      })
    },

    deleteCart ({ commit, dispatch }, payload) {
      const token = localStorage.token
      const { ProductId } = payload
      Axios({
        url: `http://localhost:3000/carts/${ProductId}/delete`,
        method: 'DELETE',
        headers: { token }
      })
        .then(({ data }) => {
          dispatch('fetchCarts')
          commit('SUCCESS', data.message)
        })
        .catch(err => {
          commit('ERROR', `${err}`)
        })
    },

    checkout ({ commit, dispatch }) {
      const token = localStorage.token
      Axios({
        url: 'http://localhost:3000/carts/checkout',
        method: 'PUT',
        headers: { token }
      })
        .then(({ data }) => {
          dispatch('fetchCarts')
          commit('SUCCESS', data.message)
        })
        .catch(err => {
          commit('ERROR', err)
        })
    },

    register (context, payload) {
      const { username, email, password } = payload
      return Axios({
        url: 'http://localhost:3000/users/register',
        method: 'POST',
        data: {
          username,
          email,
          password
        }
      })
    },

    login (context, payload) {
      const { user, password } = payload
      return Axios({
        url: 'http://localhost:3000/users',
        method: 'POST',
        data: { user, password }
      })
    }
  },
  modules: {
  }
})
