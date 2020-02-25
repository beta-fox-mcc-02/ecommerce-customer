import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const serverUrl = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    username: '',
    email: '',
    password: ''
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
    clearAll (state) {
      state.username = ''
      state.email = ''
      state.password = ''
    }
  },
  actions: {
    registerAsync ({ state }) {
      return axios({
        method: 'POST',
        url: `${serverUrl}/customer/register`,
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
        url: `${serverUrl}/customer/login`,
        data: {
          email: state.email,
          password: state.password
        }
      })
    }
  },
  modules: {
  }
})
