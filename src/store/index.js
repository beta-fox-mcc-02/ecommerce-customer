import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import M from 'materialize-css'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLogin: false,
    isLogin: false,
    categories: []
  },
  mutations: {
    loginTrigger (state) {
      state.showLogin = !state.showLogin
    },
    LOGIN_CHECK (state) {
      if (localStorage.token) state.isLogin = true
      else state.isLogin = false
    },
    GET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SUCCESS (state, payload) {
      M.toast({
        html: `${payload.message}`,
        displayLength: 3000
      })
    },
    ERROR (state, payload) {
      M.toast({
        html: `${payload.message}`,
        displayLength: 3000,
        classes: 'red'
      })
    }
  },
  actions: {
    fetchCategories ({ commit }) {
      Axios({
        url: 'http://localhost:3000/categories',
        method: 'GET'
      })
        .then(({ data }) => {
          commit('GET_CATEGORIES', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      const { username, email, password } = payload
      return Axios({
        url: 'http://localhost:3000/users/register',
        method: 'POST',
        data: {
          username,
          email,
          password
        }
      })
    },
    login (context, payload) {
      const { user, password } = payload
      return Axios({
        url: 'http://localhost:3000/users',
        method: 'POST',
        data: { user, password }
      })
    }
  },
  modules: {
  }
})
