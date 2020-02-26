import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasLogin: false,
    products: [],
    carts: []
  },
  mutations: {
    HAS_LOGIN(state) {
      state.hasLogin = true;
    },
    LOGOUT(state) {
      state.hasLogin = false;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    }
  },
  actions: {
    registerCustomer(context, payload) {
      return axios({
        method: 'POST',
        url: '/register',
        data: payload
      });
    },
    loginCustomer(context, payload) {
      return axios({
        method: 'POST',
        url: '/login',
        data: payload
      });
    },
    fetchAllProducts() {
      return axios({
        method: 'GET',
        url: '/products'
      });
    },
    fetchCarts(context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const payload = [];
          data.forEach(el => {
            payload.push({
              id: el.id,
              UserId: el.UserId,
              ProductId: el.ProductId,
              status: el.status,
              quantity: el.quantity,
              totalPrice: el.price,
              name: el.Product.name,
              price: el.Product.price
            });
          });
          context.commit('SET_CARTS', payload);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    createNewCart(context, payload) {
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      });
    },
    addItemToCart(context, payload) {
      return axios({
        method: 'PUT',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload.data
      });
    }
  },
  modules: {
  }
});
