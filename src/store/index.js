import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: [],
    products: [],
    cart: [],
    isLogedIn: false,
    listedCategory: []
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
    },
    FETCH_CART (state, data) {
      state.cart = data
    },
    CHANGE_PRICE (state, data) {
      state.totalPrice = data
    },
    LISTED_CATEGORY (state, data) {
      state.listedCategory = data
    }
  },
  actions: {
    fetchCategory () {
      return Axios({
        method: 'get',
        url: 'https://cryptic-refuge-38840.herokuapp.com/categories'
      })
    },
    findCategory (context, id) {
      return Axios({
        method: 'get',
        url: `https://cryptic-refuge-38840.herokuapp.com/categories/${id}`
      })
    },
    fetchProducts () {
      return Axios({
        method: 'get',
        url: 'https://cryptic-refuge-38840.herokuapp.com/products'
      })
    },
    register (context, payload) {
      console.log(payload)
      console.log(payload.first_name)
      return Axios({
        method: 'post',
        url: 'https://cryptic-refuge-38840.herokuapp.com/register',
        data: {
          first_name: payload.first_name,
          address: payload.address,
          email: payload.email,
          password: payload.password
        }
      })
    },
    login (context, payload) {
      return Axios({
        method: 'post',
        url: 'https://cryptic-refuge-38840.herokuapp.com/login',
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
        url: 'https://cryptic-refuge-38840.herokuapp.com/cart',
        headers: {
          token: localStorage.token
        },
        data: {
          ProductId: payload.ProductId,
          price: payload.price,
          totalItem: payload.totalItem
        }
      })
    },
    fetchCart () {
      return Axios({
        method: 'get',
        url: 'https://cryptic-refuge-38840.herokuapp.com/cart',
        headers: {
          token: localStorage.token
        }
      })
    },
    destroy (context, id) {
      return Axios({
        method: 'delete',
        url: `https://cryptic-refuge-38840.herokuapp.com/cart/${id}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    update (context, payload) {
      return Axios({
        method: 'put',
        url: `https://cryptic-refuge-38840.herokuapp.com/cart/${payload.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          quantity: payload.quantity,
          price: payload.price
        }
      })
    },
    payment (context, payload) {
      return Axios({
        method: 'post',
        url: `https://cryptic-refuge-38840.herokuapp.com/cart/${payload.UserId}`,
        headers: {
          token: localStorage.token
        },
        data: {
          carts: payload.carts
        }
      })
    }
  },
  modules: {
  }
})
