import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('access_token'),
    isAdmin: localStorage.getItem('isAdmin'),
    products: [],
    productDetail: {},
    productToEdit: null,
    cart: [],
    cartTotal: 0
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_ONE_PRODUCT(state, payload) {
      state.productDetail = payload
    },
    SET_NEW_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    USER_STATUS(state, payload) {
      state.isAdmin = payload
    },
    SET_CART (state, payload) {
      let total = 0
      let products = payload.cart
      for (let i in products) {
        let price = products[i].Product.price
        let quantity = products[i].quantity
        total += price * quantity
      }
      state.cartTotal = total
      state.cart = payload
    }    
  },
  actions: {
    userRegister({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/register',
          data: payload,
          method: 'POST'
        })
        .then(({data}) => {
          commit('SET_SESSION', true)
          commit('USER_STATUS', data.isAdmin)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    userLogin ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          data: payload,
          method: 'POST'
        })
        .then(({data}) => {
          commit('SET_SESSION', true)
          commit('USER_STATUS', data.isAdmin)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    fetchProducts ({commit}) {
      axios({
        url: '/products',
        method: 'GET'
      })
      .then(({data}) => {
        commit('SET_PRODUCTS', data)
      })
      .catch(err => {
        this.toastify('error', err)
      })
    },

    fetchProductDetail({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/products/${payload}`,
          method: 'GET'
        })
        .then(({data}) => {
          commit('SET_ONE_PRODUCT', data)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    deleteProduct({dispatch, commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `products/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          commit('SET_PRODUCT_AFTER_DELETE', data)
          dispatch('fetchProducts')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    addProduct({dispatch ,commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/products',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          commit('SET_NEW_PRODUCT', data)
          dispatch('fetchProducts')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    editProduct({dispatch}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method:'PUT',
          url: `/products/${payload.id}`,
          data: {
            name: payload.name,
            image_url: payload.image_url,
            price: +payload.price,
            stock: +payload.stock
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }          
        })
        .then(({data}) => {
          dispatch('fetchProducts')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    fetchCart ({commit}) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          commit('SET_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateCart ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/carts',
          data: payload,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_CART', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    deleteCart({dispatch, commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `carts/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          commit('SET_CART_AFTER_DELETE', data)
          dispatch('fetchCart')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    }

  },
  modules: {
  }
})
