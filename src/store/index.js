import Vue from 'vue'
import Vuex from 'vuex'
import client from '../helpers/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || {},
    products: [],
    cart: []
  },
  mutations: {
    // AUTH
    AUTH(state, data) {
      state.token = data.token
      state.user = data.user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', data.user)
    },
    LOGOUT(state) {
      state.token = ''
      localStorage.clear('token')
      state.user = {}
      localStorage.clear('user')
    },

    // END OF AUTH

    // PRODUCTS

    SET_PRODUCTS(state, products) {
      state.products = products
    },
    // END OF PRODUCTS
    // CART
    ADD_CART(state, product) {
      state.cart.push(product)
    },
    SET_CART(state, cart) {
      state.cart = cart
    }
    // END OF CART
  },
  actions: {
    // AUTH
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        client
          .post('/users/register', data)
          .then(response => {
            commit('AUTH', response.data)
            resolve('/')
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        client
          .post('/users/login', data)
          .then(response => {
            commit('AUTH', response.data)
            resolve('/')
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('logout')
        resolve()
      })
    },
    // END OF AUTH

    // PRODUCTS

    getProducts({ commit }) {
      return new Promise((resolve, reject) => {
        client
          .get(`/products`)
          .then(({ data }) => {
            commit('SET_PRODUCTS', data.products)
            resolve(data.products)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    // END OF PRODUCTS

    // CART ITEM

    addItem: function({ commit }, data) {
      const token = localStorage.token
      return new Promise((resolve, reject) => {
        client
          .post('/carts', data, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            commit('ADD_CART', response.data)
            resolve(response.data)
            // resolve('Success adding item to cart.')
          })
          .catch(() => {
            reject('Error adding item to cart.')
          })
      })
    },
    getCart({ commit }) {
      const token = localStorage.token
      return new Promise((resolve, reject) => {
        client
          .get('/carts', {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            commit('SET_CART', response.data)
            resolve(response.data)
            // resolve('Success adding item to cart.')
          })
          .catch(() => {
            reject('Error adding item to cart.')
          })
      })
    }

    // END OF CART ITEM
  },
  getters: {
    isAuthenticated: function() {
      return !!localStorage.token
    },
    token: function() {
      return localStorage.token
    }
  }
})
