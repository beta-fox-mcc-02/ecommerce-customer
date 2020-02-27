import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    message: '',
    page: '',
    cart: [],
    err: []
  },
  mutations: {
    ADD_LIST (state, payload) {
      state.list = payload
    },
    SEND_MESSAGE (state, payload) {
      state.message = payload
    },
    CHANGE_PAGE (state, payload) {
      state.page = payload
    },
    ADD_CART (state, payload) {
      state.cart = payload
    },
    ERROR_MESSAGE (state, payload) {
      state.err.push(payload)
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000'
      })
        .then(({ data }) => {
          context.commit('ADD_LIST', data.data)
        })
        .catch(err => {
          context.commit('ERROR_MESSAGE', err)
        })
    },
    fetchLogin (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchRegister (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchAddCart (context, payload) {
      return axios({
        method: 'POST',
        url: `http://localhost:3000/${payload.id}`,
        data: {
          amount: payload.amount,
          price: payload.price
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchCart (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('ADD_CART', data.data)
        })
        .catch(err => {
          context.commit('ERROR_MESSAGE', err)
        })
    },
    fetchCheckout (context, payload) {
      return axios({
        method: 'PUT',
        url: 'http://localhost:3000/cart',
        data: {
          cart: payload
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
