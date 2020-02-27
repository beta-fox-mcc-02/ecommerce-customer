import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    successMessage: '',
    errorHandler: '',
    isNavLogin: 'login',
    cart: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_ERROR_HANDLER (state, payload) {
      state.errorHandler = payload
    },
    SET_IS_NAV_LOGIN (state, payload) {
      state.isNavLogin = payload
    },
    SET_SUCCESS_MESSAGE (state, payload) {
      state.successMessage = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    fetchProduct (context) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('SET_PRODUCTS', data.dataItems)
        })
        .catch(({ response }) => {
          context.commit('SET_ERROR_HANDLER', response)
        })
    },
    registerOn (context, payload) {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/register',
        data: payload
      })
        .then(({ data }) => {
          context.commit('SET_IS_NAV_LOGIN', 'login')
          context.commit('SET_SUCCESS_MESSAGE', 'Register is successfully')
          setTimeout(() => {
            context.commit('SET_SUCCESS_MESSAGE', '')
          }, 5000)
        })
        .catch(({ response }) => {
          const messageErr = response.data.errors[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    loginOn (context, payload) {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.token = data.access_token
          router.push('/customer')
          context.commit('SET_SUCCESS_MESSAGE', 'Login is successfully')
          setTimeout(() => {
            context.commit('SET_SUCCESS_MESSAGE', '')
          }, 5000)
        })
        .catch(({ response }) => {
          const messageErr = response.data.errors[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    fetchOneProduct (context, payload) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products/' + payload
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT', data.dataItem)
        })
    },
    addToCart (context, payload) {
      context.commit('SET_CART', payload)
    }
  },
  modules: {
  }
})
