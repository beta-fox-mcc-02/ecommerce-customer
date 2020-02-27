import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    currentPage: '',
    carts: [],
    currentUserId: '',
    addCartFormShow: false,
    productIdForAddCart: null,
    signUpData: {},
    productId: null,
    productToUpdate: {},
    cartId: null,
    stockAvailable: null,
    quantityUpdated: null,
    loadingSignUp: false,
    message: '',
    loadingFetchProducts: false,
    loadingFetchCarts: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_CURRENT_PAGE (state, payload) {
      state.currentPage = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_CURRENT_USERID (state, payload) {
      state.currentUserId = payload
    },
    SET_ADD_CART_FORM_SHOW (state, payload) {
      state.addCartFormShow = payload
    },
    SET_PRODUCT_ID_FOR_ADD_CART (state, payload) {
      state.productIdForAddCart = payload
    },
    SET_SIGN_UP_DATA (state, payload) {
      state.signUpData = payload
    },
    SET_PRODUCT_TO_UPDATE (state, payload) {
      state.productToUpdate = payload
    },
    SET_STOCK_AVAILABLE (state, payload) {
      state.stockPurchased = payload
    },
    SET_PRODUCT_ID (state, payload) {
      state.productId = payload
    },
    SET_CART_ID (state, payload) {
      state.cartId = payload
    },
    SET_QUANTITY_UPDATED (state, payload) {
      state.quantityUpdated = payload
    },
    SET_LOADING_SIGNUP (state, payload) {
      state.loadingSignUp = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_LOADING_FETCH_PRODUCTS (state, payload) {
      state.loadingFetchProducts = payload
    },
    SET_LOADING_FETCH_CARTS (state, payload) {
      state.loadingFetchCarts = payload
    }
  },
  actions: {
    fetchProducts () {
      this.commit('SET_LOADING_FETCH_PRODUCTS', true)
      return axios({
        method: 'GET',
        url: '/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchCarts () {
      this.commit('SET_LOADING_FETCH_CARTS', true)
      return axios({
        method: 'GET',
        url: '/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    signUp () {
      this.commit('SET_LOADING_SIGNUP', true)
      return axios({
        method: 'POST',
        url: '/users/signUp',
        data: this.state.signUpData
      })
    },
    editCartQuantity () {
      return axios({
        method: 'PUT',
        url: `/carts/${this.state.cartId}`,
        data: {
          UserId: this.state.currentUserId,
          ProductId: this.state.productId,
          quantity: this.state.quantityUpdated
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    findOneProduct () {
      return axios({
        method: 'GET',
        url: `/products/${this.state.productId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    purchase () {
      return axios({
        method: 'PUT',
        url: `/carts/${this.state.cartId}`,
        data: {
          status: true
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    editProductStock () {
      return axios({
        method: 'PUT',
        url: `/products/${this.state.productId}`,
        data: {
          stock: this.state.stockPurchased
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart () {
      return axios({
        method: 'DELETE',
        url: `/carts/${this.state.cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
