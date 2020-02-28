import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLoginPage: true,
    isLogin: false,
    loadingForm: false,
    currentUser: {},
    products: []
  },
  mutations: {
    changeSignForm (state, status) {
      state.isLoginPage = status
    },
    runLoading (state, status) {
      state.loadingForm = status
    },
    setIsLoading (state, status) {
      state.isLoading = status
    },
    addCurrentUser (state, data) {
      state.currentUser = data
    },
    setIsLogin (state, status) {
      state.isLogin = status
    },
    storeProducts (state, data) {
      state.products = data
    }
  },
  actions: {
    login ({ commit, state }, { email, password }) {
      return axios({
        method: 'post',
        url: '/auth/login',
        data: {
          email,
          password
        }
      })
    },
    register ({ commit, state }, { name, email, password }) {
      return axios({
        method: 'post',
        url: '/auth/register',
        data: {
          name,
          email,
          password
        }
      })
    },
    addCart (context, data) {
      return axios({
        method: 'post',
        url: '/cart',
        headers: {
          token: localStorage.token
        },
        data
      })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'get',
        url: '/cart',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('addCurrentUser', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchProducts ({ commit }) {
      commit('setIsLoading', true)
      axios({
        method: 'get',
        url: '/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('setIsLoading', false)
          commit('storeProducts', data)
        })
        .catch(({ response }) => {
          console.log(response)
          commit('setIsLoading', false)
        })
    },
    deleteFromCart ({ state }, id) {
      return axios({
        method: 'delete',
        url: `/cart/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          TransactionId: state.currentUser.Transactions[0].id
        }
      })
    },
    updateCart ({ state }, data) {
      const id = state.currentUser.Transactions[0].id
      return axios({
        method: 'put',
        url: `/cart/${id}`,
        headers: {
          token: localStorage.token
        },
        data
      })
    },
    checkout ({ state }) {
      return axios({
        method: 'post',
        url: '/checkout',
        headers: {
          token: localStorage.token
        },
        data: {
          cart: state.currentUser.Transactions[0]
        }
      })
    },
    uploadImage (context, payload) {
      const photoFormData = new FormData()
      photoFormData.append('file', payload)
      return axios({
        method: 'post',
        url: '/product/upload',
        headers: {
          // eslint-disable-next-line
          'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
        },
        data: photoFormData
      })
    }
  },
  modules: {
  }
})
