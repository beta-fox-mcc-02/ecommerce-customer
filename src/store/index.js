import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    baseUrl: 'http://localhost:3000',
    products: [],
    cart: [],
    productDetails: {
      id: '',
      name: '',
      image_url: '',
      stock: '',
      price: ''
    },
    errMsg: ''
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
      if (payload === false) {
        router.push('/')
      }
      console.log(payload, 'LOGGED')
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
      console.log(payload)
    },
    TO_EDIT_PRODUCT (state, payload) {
      state.productDetails = payload
      console.log(payload.name, 'INDEXIS')
      router.push('editProduct')
    },
    SET_CART (state, payload) {
      state.cart = payload
      console.log(payload)
    }
  },
  actions: {
    login (context, data) {
      console.log(data, '====data')
      axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/login',
        data
      })
        .then(response => {
          console.log(response, 'LOGGEDINNN')
          localStorage.setItem('access_token', response.data.access_token)
          context.commit('SET_LOGIN', true)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, data) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/register',
        data
      })
        .then(response => {
          router.push('Login')
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
    },
    addProduct (context, data) {
      axios({
        method: 'POST',
        url: `${this.state.baseUrl}/products`,
        headers: {
          access_token: localStorage.access_token
        },
        data
      })
        .then(() => {
          router.push('/')
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    editProduct (context, data) {
      console.log('KIJANG 1')
      axios({
        method: 'PUT',
        url: `${this.state.baseUrl}/products/${data.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data
      })
        .then(() => {
          router.push('/')
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteProduct (context, id) {
      axios({
        method: 'DELETE',
        url: `${this.state.baseUrl}/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          router.push('/')
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response.data, 'CUST CART')
          commit('SET_CART', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, id) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/cart'
      })
    }
  },
  modules: {
  }
})
