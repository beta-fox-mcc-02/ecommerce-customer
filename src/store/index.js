import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProduct: [],
    detailProduct: {},
    loading: false,
    notification: '',
    myCarts: []
  },
  mutations: {
    SET_ALL_PRODUCT (state, payload) {
      state.allProduct = payload
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    NOTIFICATION (state, payload) {
      state.notification = payload
      Toastify({
        text: `${state.notification}`,
        backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
        className: "info"
      }).showToast()
    },
    SET_ALL_MY_CART(state, payload) {
      state.myCarts = payload
    }
  },
  actions: {
    getAllItem ({ commit }) {
      commit('SET_LOADING', true)
      axios({
        method: `GET`,
        url: `/products`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SET_LOADING', false)
          commit('SET_ALL_PRODUCT', data.data)
        })
        .catch(err => {
          let error = err.response.data.msg
           Toastify({
            text: `${error}`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        })
    },
    getAllMyCart ({commit}) {
      commit('SET_LOADING', true)
      axios({
        method: `GET`,
        url: '/carts',
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          commit('SET_LOADING', false)
          commit('SET_ALL_MY_CART', data)
        })
        .catch(err => {
          console.log(err.response);
          commit('SET_LOADING', false)

        })
    }
  },
  modules: {
  }
})
