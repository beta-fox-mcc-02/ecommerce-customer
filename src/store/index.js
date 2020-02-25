import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import VueJWT from 'vuejs-jwt'

Vue.use(Vuex)
Vue.use(VueJWT, 'hacktiv100')

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    message: '',
    alertStatus: null,
    user: {
      id: '',
      name: '',
      email: ''
    }
  },
  getters: {
    getAlert: state => {
      // console.log(state.alertStatus)
      return state.alertStatus ? 'success' : 'error'
    }
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_ISLOGIN (state, status) {
      state.isLogin = status
    },
    SET_MESSAGE (state, payload) {
      // console.log(payload)
      state.message = payload.msg
      state.alertStatus = payload.status
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    fetchUser (context, token) {
      // console.log(localStorage.access_token)
      const payload = Vue.$jwt.decode(token)
      // context.commit('SET_USER', payload)
      // this.$jwt.getToken()
      // const payload = this.$jwt.decode(localStorage.access_token, 'hacktiv8')
      // console.log(payload)
      return axios({
        method: 'GET',
        url: `users/${payload.id}`
      })
    },
    updateUser (context, payload) {
      console.log(payload)
      axios({
        method: 'PUT',
        url: `users/${payload.id}`,
        data: {
          name: payload.name,
          email: payload.email
        }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('SET_MESSAGE', { msg: data.msg, status: true })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    register (context, payload) {
      return axios({
        method: 'POST',
        url: 'users/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          RoleId: 2
        }
      })
    },
    login (context, payload) {
      return axios({
        method: 'POST',
        url: 'users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: 'products'
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('SET_PRODUCT', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {
  }
})
