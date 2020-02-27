import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loading: false,
    products: [],
    watch: {},
    carts: [],
    transactions: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_WATCH (state, payload) {
      state.watch = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_TRANSACTIONS (state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    fetchProducts ({ commit, state }) {
      state.loading = true
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
          setTimeout(() => {
            state.loading = false
          }, 3000)
        })
        .catch(_ => {
          state.loading = false
        })
    },
    isLogin ({ state }, payload) {
      state.isLogin = payload
    },
    register (context, payload) {
      return axios({
        method: 'POST',
        url: '/user/register',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
    },
    login (context, payload) {
      return axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchWatch ({ commit, state }, payload) {
      state.loading = true
      axios({
        method: 'GET',
        url: `/products/${payload}`
      })
        .then(({ data }) => {
          commit('SET_WATCH', data)
          setTimeout(() => {
            state.loading = false
          }, 1000)
        })
        .catch(_ => {})
    },
    addCart (context, payload) {
      return axios({
        method: 'POST',
        url: '/cart',
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity
        },
        headers: {
          token: localStorage.token
        }
      })
    },
    fetchCart ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: '/cart',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SET_CARTS', data)
        })
        .catch(_ => {})
    },
    deleteCart (context, payload) {
      axios({
        method: 'DELETE',
        url: `/cart/${payload}`,
        headers: {
          token: localStorage.token
        }
      })
      .then(_ => {
        context.dispatch('fetchCart')
      })
      .catch(_ => {})
    },
    checkout ({ state }) {
      return axios({
        method: 'PATCH',
        url: '/cart',
        headers: {
          token: localStorage.token
        },
        data: {
          carts: state.carts
        }
      })
    },
    fetchTransaction ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: '/cart/transactions',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_TRANSACTIONS', data)
        })
        .catch(_ => {})
    },
  },
  modules: {
  },
  getters: {
    menBox (state) {
      const menBox = []
      const products = state.products.filter(jam => jam.Category.name === 'Men Watch')
      for (let i = 0; i < 4; i++) {
        menBox.push(products[i])
      }
      return menBox
    },
    ladiesBox (state) {
      const ladiesBox = []
      const products = state.products.filter(jam => jam.Category.name === 'Ladies Watch')
      for (let i = 0; i < 4; i++) {
        ladiesBox.push(products[i])
      }
      return ladiesBox
    } 
  }
})
