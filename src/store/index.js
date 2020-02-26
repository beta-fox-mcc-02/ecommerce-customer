import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Toastify from 'toastify-js'
// import url from '@/axios/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    token: false,
    costumer: {},
    carousel: [],
    carts: []
  },
  mutations: {
    FETCH_CART (state, items) {
      console.log(items)
      state.carts = items
    },
    FETCH_CAROUSEL (state, item) {
      state.carousel = item
    },
    FETCH_PRODUCTS (state, products) {
      state.products = products
    },
    FETCH_COSTUMER (state, costumer) {
      state.costumer = costumer
    },
    ISLOGIN (state, status) {
      state.token = status
      state.isLogin = status
      // console.log(state.isLogin)
    },
    LOGOUT (state, status) {
      state.token = status
    }
  },
  actions: {
    loginCostumer (context, payload) {
      axios.post('http://localhost:3000/costumers/login', payload)
        .then(({ data }) => {
          localStorage.token = data.token
          context.commit('ISLOGIN', true)
          router.push('/')
        })
        .catch(({ response }) => {
        // console.log(response.data.err)
          Toastify({
            text: response.data.err,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    registerCostumer (context, payload) {
      console.log(payload)
      axios.post('http://localhost:3000/costumers/register', payload)
        .then(({ data }) => {
          localStorage.token = data.token
          context.commit('ISLOGIN', true)
          router.push('/admin')
        })
        .catch(({ response }) => {
          const err = response.data.err
          // console.log()
          err.forEach(element => {
            Toastify({
              text: element,
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              className: 'info'
            }).showToast()
          })
        })
    },
    fetchProducts (context) {
      axios.get('http://localhost:3000/products/list')
        .then(({ data }) => {
          // console.log(data)
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(({ response }) => {
          // console.log(response.data.err)
          Toastify({
            text: response.data.err,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    fetchCostumer (context) {
      axios.get('http://localhost:3000/costumers', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('FETCH_COSTUMER', data)
        })
        .catch(({ response }) => {
          // console.log(response.data.err)
          Toastify({
            text: response.data.err,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    fetchCarousel (context) {
      axios.get('https://api.jikan.moe/v3/search/anime?q=gundam&limit=10')
        .then(({ data }) => {
          console.log(data.results)
          context.commit('FETCH_CAROUSEL', data.results)
        })
        .catch(({ response }) => {
          // console.log(response.data.err)
          Toastify({
            text: response.data.err,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    inputToCart (context, payload) {
      axios.post('http://localhost:3000/costumers/cart', payload, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
        // console.log(data.results)
          router.push('/cart')
        })
        .catch(({ response }) => {
        // console.log(response.data.err)
          Toastify({
            text: response.data.err,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    fetchCart (context) {
      axios.get('http://localhost:3000/costumers/cart', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('FETCH_CART', data)
        })
        .catch(({ response }) => {
          const err = response.data.err
          // console.log()
          err.forEach(element => {
            Toastify({
              text: element,
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              className: 'info'
            }).showToast()
          })
        })
    },
    cancelProduct (context, payload) {
      console.log(payload)
      axios.delete('http://localhost:3000/costumers/cart', {
        headers: {
          token: localStorage.token,
          CartId: payload.CartId,
          ProductId: payload.ProductId
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
          context.dispatch('fetchCostumer')
        })
        .catch(({ response }) => {
          const err = response.data.err
          // console.log()
          err.forEach(element => {
            Toastify({
              text: element,
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              className: 'info'
            }).showToast()
          })
        })
    }
  }
})

export default store
