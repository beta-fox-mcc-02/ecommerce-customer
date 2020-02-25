import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    oneProduct: {},
    notification: '',
    error: {},
    isLoading: false,
    isLogin: false
  },
  mutations: {
    FETCH_PRODUCTS (state, data) {
      state.products = data
    },
    FETCH_ONE_PRODUCT (state, data) {
      state.oneProduct = data.product
    },
    SET_IS_LOADING (state, data) {
      state.isLoading = data
    },
    SET_NOTIFICATION (state, data) {
      state.notification = data
    },
    SET_ERROR (state, data) {
      state.error = data
    },
    SET_IS_LOGIN (state, data) {
      state.isLogin = data
    }
  },
  actions: {
    fetchProducts (context) {
      context.commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'product'
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data.products)
          context.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          context.commit('SET_ERROR', err)
          context.commit('SET_IS_LOADING', false)
        })
    },

    fetchOneProduct (context, product) {
      context.commit('SET_IS_LOADING', true)
      return axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'product/' + product.id
      })
    },

    login (context, data) {
      context.commit('SET_IS_LOADING', true)
      return axios({
        method: 'post',
        url: process.env.VUE_APP_BASEURL + 'login',
        data: {
          identification: data.identification,
          password: data.password
        }
      })
    },

    register (context, data) {
      context.commit('SET_IS_LOADING', true)
      return axios({
        method: 'post',
        url: process.env.VUE_APP_BASEURL + 'register',
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
    }
  },
  modules: {
  }
})
