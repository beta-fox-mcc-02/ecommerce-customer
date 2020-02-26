import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login (context, data) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/admins/login',
        data
      })
        .then(response => {
          console.log(response)
          localStorage.setItem('access_token', response.data.access_token)
          context.commit('SET_LOGIN', true)
          // router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, data) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/admins/register',
        data
      })
        .then(response => {
          // router.push('Login')
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response.data, '=====')
          commit('SET_PRODUCTS', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
