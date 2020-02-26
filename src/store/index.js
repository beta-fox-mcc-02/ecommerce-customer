import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: [],
    products: [],
    isLogedIn: false
  },
  mutations: {
    FETCH_CATEGORY (state, data) {
      state.category = data
    },
    FETCH_PRODUCTS (state, data) {
      state.products = data
    },
    FETCH_ISLOGEDIN (state, data) {
      state.isLogedIn = data
    }
  },
  actions: {
    fetchCategory () {
      return Axios({
        method: 'get',
        url: 'http://localhost:3000/categories'
      })
    },
    fetchProducts () {
      return Axios({
        method: 'get',
        url: 'http://localhost:3000/products'
      })
    },
    register (context, payload) {
      return Axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          name: payload.name,
          address: payload.address,
          email: payload.email,
          password: payload.password
        }
      })
    },
    login (context, payload) {
      return Axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    cart (context, payload) {
      console.log(payload)
      return Axios({
        method: 'post',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.token
        },
        data: {
          ProductId: payload.ProductId,
          price: payload.price,
          totalItem: payload.totalItem
        }
      })
    }
  },
  modules: {
  }
})
