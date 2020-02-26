import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// const serverUrl = 'http://localhost:3000'
const serverUrl = 'https://mysterious-beach-02436.herokuapp.com'

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    product: [],
    transaction: {},
    username: '',
    email: '',
    password: '',
    loginStatus: false
  },
  mutations: {
    setUsername (state, value) {
      state.username = value
    },
    setEmail (state, value) {
      state.email = value
    },
    setPassword (state, value) {
      state.password = value
    },
    setLoginStatus (state, value) {
      state.loginStatus = value
    },
    setProducts (state, value) {
      state.products = value
    },
    setProduct (state, value) {
      state.product = value
    },
    setCategories (state, value) {
      state.categories = value
    },
    setTransaction (state, value) {
      state.transaction = value
    },
    clearAll (state) {
      state.username = ''
      state.email = ''
      state.password = ''
      state.loginStatus = false
    }
  },
  actions: {
    registerAsync ({ state }) {
      return axios({
        method: 'POST',
        url: `${serverUrl}/customers/register`,
        data: {
          username: state.username,
          email: state.email,
          password: state.password
        }
      })
    },
    loginAsync ({ state }) {
      return axios({
        method: 'POST',
        url: `${serverUrl}/customers/login`,
        data: {
          email: state.email,
          password: state.password
        }
      })
    },
    fetchProductsAsync ({ state, commit }) {
      axios({
        method: 'GET',
        url: `${serverUrl}/products`
      })
        .then((result) => {
          commit('setProducts', result.data.products)
          return axios({
            method: 'GET',
            url: `${serverUrl}/categories`
          })
        })
        .then((result) => {
          commit('setCategories', result.data.data)
        })
        .catch((err) => console.log(err))
    },
    getProductAsync ({ state }, categoryId) {
      return axios({
        method: 'GET',
        url: `${serverUrl}/products/${categoryId}`
      })
    },
    getItem ({ state }, itemId) {
      return axios({
        method: 'GET',
        url: `${serverUrl}/item/${itemId}`
      })
    },
    checkoutAsync ({ state }, { token, itemId, stock }) {
      if (stock > 0) {
        return axios({
          method: 'POST',
          url: `${serverUrl}/transactions`,
          data: { token, itemId, stock }
        })
      } else return false
    },
    getTransactionAsync ({ state, commit }, token) {
      axios({
        method: 'GET',
        url: `${serverUrl}/transactions`,
        headers: { token }
      })
        .then((result) => {
          commit('setTransaction', result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    payAsync ({ state }, payload) {
      return axios({
        method: 'PUT',
        url: `${serverUrl}/transactions/${payload.customerId}`,
        data: { productId: payload.productId }
      })
    }
  }
})
