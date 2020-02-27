import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    cartNotif: 0,
    cartItem: [],
    err: ''
  },
  mutations: {
    dataCategory (state, data) {
      state.items = data
    },
    addCart (state, data) {
      state.cartNotif += 1
    },
    itemsCart (state, data) {
      state.cartItem = data
    }
  },
  actions: {
    fecthData (context, id) {
      axios.get(`/${id}`)
        .then(({ data }) => {
          context.commit('dataCategory', data.data)
        })
        .catch(err => {
          this.text = err
        })
    },
    createCart (context, url, paylaod, headers) {
      axios.post(url, { id: paylaod }, { headers: { token: headers.token } })
        .then(({ data }) => {
          context.commit('addCart', 1)
        })
        .catch(err => {
          this.text = err
        })
    }
  },
  modules: {
  }
})
