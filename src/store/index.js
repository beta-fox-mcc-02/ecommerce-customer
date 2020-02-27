import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    loading: false,
    error: ''
  },
  mutations: {
    fetchProduct(state, payload) {
      state.products = payload
    },
    fetchCart(state, payload) {
      state.cart = payload
    },
    enLoading(state, payload) {
      state.loading = payload
    },
    showError(state, payload) {
      state.error = payload
    }
  },
  actions: {
    register(context, data) {
      return axios({
        method: 'POST',
        url: '/register',
        data
      })
    },
    login(context, data) {
      return axios({
        method: 'POST',
        url: '/login',
        data,
        loading: false
      })
    },
    fetchProduct(context) {
      context.commit('enLoading', true)
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('fetchProduct', data.products)
          context.commit('enLoading', false)
        })
        .catch(err => {
          if (err.response.data.error) {
            context.commit('showError', err.response.data.error)
          } else if (err.response.data.errors) {
            context.commit('showError', err.response.data.errors[0])
          }
        })
    },
    fetchCart(context) {
      context.commit('enLoading', true)
      axios({
        method: 'GET',
        url: '/cart',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('fetchCart', data)
          context.commit('enLoading', false)
        })
        .catch(err => {
          if (err.response.data.error) {
            context.commit('showError', err.response.data.error)
          } else if (err.response.data.errors) {
            context.commit('showError', err.response.data.errors[0])
          }
          context.commit('enLoading', false)
        })
    },
    addToCart(context, data) {
      return axios({
        method: 'POST',
        url: '/cart',
        data,
        headers: {
          token: localStorage.token
        }
      })
    },
    deleteCart(context, id) {
      return axios({
        method: 'DELETE',
        url: `/cart/${id}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    updateCart(context, data) {
      return axios({
        method: 'PATCH',
        url: `/cart/${data.id}`,
        data,
        headers: {
          token: localStorage.token
        }
      })
    },
    checkoutCart(context, data) {
      return axios({
        method: 'PATCH',
        url: '/checkout',
        data,
        headers: {
          token: localStorage.token
        }
      })
    }
  },
  modules: {
  }
})
