import Vue from 'vue'
import Vuex from 'vuex'
import instance from '../config/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    costumerId: 0,
    products: [],
    carts: [],
    cart: {}
  },
  mutations: {
    FETCH_PRODUCT (state, payload) {
      state.products = payload
    },
    FETCH_ALL_CARTS (state, payload) {
      state.carts = payload
    },
    INPUT_COSTUMER_ID (state, payload) {
      state.costumerId = payload
    },
    FETCH_CART (state, payload) {
      state.cart = payload
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
    },
    viewAllCart ({ commit }, id) {
      return instance({
        method: 'get',
        url: `/cart/${id}`
      })
    },
    viewCart ({ commit }, id) {
      instance({
        method: 'get',
        url: `/cart/view/${id}`
      })
        .then(data => {
          console.log(data)
          commit('FETCH_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart ({ commit }, ProductId, CostumerId) {
      return instance({
        method: 'post',
        url: '/cart',
        data: {
          ProductId,
          CostumerId
        }
      })
    },
    deleteCart ({ commit }, id) {
      return instance({
        method: 'post',
        url: `/cart/${id}`
      })
    }
  },
  modules: {
  }
})
