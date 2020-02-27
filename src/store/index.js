import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    history: [],
    isLogin: false
  },
  mutations: {
    resetProduct(state) {
      state.products = []
    },
    setProduct(state, list){
      state.products = list
    },
    resetCart(state) {
      state.carts = []
    },
    setCart(state, list) {
      state.carts.push(list)
    },
    setLogin(state, payload) {
      state.isLogin = payload
    },
    resetHistory(state) {
      state.history = []
    },
    setHistory(state, list) {
      state.history.push(list)
    }
  },
  actions: {
    fetchProduct() {
      return axios({
        method: 'get',
        url: 'https://tranquil-coast-06554.herokuapp.com/admin/product',
        // url: 'http://localhost:3000/admin/product'
      })
    },
    fetchCart() {
      return axios({
        method: 'get',
        // url: 'http://localhost:3000/cart',
        url: 'https://tranquil-coast-06554.herokuapp.com/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchHistory() {
      return axios({
        method: 'get',
        // url: 'http://localhost:3000/history',
        url: 'https://tranquil-coast-06554.herokuapp.com/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
