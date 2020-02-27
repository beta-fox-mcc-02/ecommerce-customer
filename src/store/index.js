import Vue from 'vue'
import Vuex from 'vuex'
import ecommerce from '../api/ecommerce'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    message: '',
    menus: [
      { name: 'Home', icon: 'home', route: '/' },
      { name: 'About', icon: 'category', route: '/about' },
      { name: 'Shoes', icon: 'shop', route: '/shoes' },
      { name: 'Categories', icon: 'category', route: '/categories' }
    ],
    contactIcons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ],
    carouselItems: [
      {
        name: 'Spring/Summer 2020',
        bg: 'https://www.wolkyshop.co.uk/fjc_images/originals/w2017_ws_banner_carousel_799x324_uk_wt1_04075basevz20.jpg'
      },
      {
        name: 'Light Shoes',
        bg: 'https://www.safetyjogger.com/sites/all/themes/safetyjogger/img/carousel/lightweight-en.jpg'
      },
      {
        name: 'Strong Shoes',
        bg: 'https://boombah.scene7.com/is/image/boombah/home-new-index-new-footwear-mbb-banner-3?wid=2400'
      }
    ],
    categories: [],
    cart: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setLoginStatus (state, payload) {
      state.isLogin = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setCartData (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    fetchShoes ({ commit }) {
      ecommerce.get('/product')
        .then(({ data }) => {
          commit('setProducts', data.data)
        })
        .catch(err => {
          commit('setMessage', err.response.data.msg)
        })
    },
    getAllCategories ({ commit }) {
      ecommerce.get('/category')
        .then(({ data }) => {
          commit('setCategories', data.data)
        })
        .catch(err => {
          commit('setMessage', err)
        })
    },
    login ({ commit }, payload) {
      return ecommerce.post('/login', payload)
    },
    register ({ commit }, payload) {
      return ecommerce.post('/register/user', payload)
    },
    getOneShoe ({ commit }, payload) {
      return ecommerce.get(`/product/${payload}`)
    },
    getCartData ({ commit }) {
      ecommerce.get('/cart', {
        headers: {
          access_token: localStorage.user_token
        }
      })
        .then(({ data }) => {
          commit('setCartData', data.data)
        })
        .catch(err => {
          commit('setMessage', err.response.data.msg)
        })
    },
    addToCart ({ commit }, payload) {
      return ecommerce.post(`/cart/${payload}`, {}, {
        headers: {
          access_token: localStorage.user_token
        }
      })
    },
    changeQuantity ({ commit }, payload) {
      return ecommerce.put(`/cart/${payload.id}`, {
        value: payload.value
      }, {
        headers: {
          access_token: localStorage.user_token
        }
      })
    },
    deleteOneItem ({ commit }, payload) {
      return ecommerce.delete(`/cart/${payload}`, {
        headers: {
          access_token: localStorage.user_token
        }
      })
    },
    deleteAllItems ({ commit }) {
      return ecommerce.delete('/cart', {
        headers: {
          access_token: localStorage.user_token
        }
      })
    },
    checkout ({ commit }) {
      return ecommerce.get('/cart/checkout', {
        headers: {
          access_token: localStorage.user_token
        }
      })
    }
  }
})
