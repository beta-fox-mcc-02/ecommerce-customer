import Vue from 'vue';
import Vuex from 'vuex';
import userAPI from '../API/userAPI';
import productAPI from '../API/productAPI';
import cartAPI from '../API/cartAPI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // alert
    successMessage: '',
    showSuccessAlert: false,
    // loading
    isLoading: false,
    // error
    error: '',
    // login logout
    isLogin: false,
    personData: {},
    // fetch products
    listOfProducts: [],
  },
  getters: {
    notPaidProduct(state) {
      if (state.personData.Products) {
        return state.personData.Products.filter((product) => !product.Cart.paid);
      }
      return [];
    },
    paidProduct(state) {
      if (state.personData.Products) {
        return state.personData.Products.filter((product) => product.Cart.paid);
      }
      return [];
    },
  },
  mutations: {
    // alert
    showAlert(state, payload) {
      state.successMessage = payload.successMessage;
      state.showSuccessAlert = true;
      setTimeout(() => {
        state.showSuccessAlert = false;
      }, payload.interval);
    },
    // loading
    setLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    // error
    setError(state, error) {
      state.error = error;
    },
    // login logout
    setLogin(state, payload) {
      state.isLogin = true;
      state.personData = payload;
    },
    setLogout(state) {
      state.isLogin = false;
      state.personData = {};
      state.isMaster = false;
    },
    // fetch products
    setListOfProducts(state, payload) {
      state.listOfProducts = payload;
    },
  },
  actions: {
    // login logout
    login(context, payload) {
      context.commit('setLoading');
      return userAPI.post('/login', payload);
    },
    logout(context) {
      context.commit('setLoading');
      context.commit('setLogout');
      context.commit('stopLoading');
    },
    registerUser(context, payload) {
      context.commit('setLoading');
      return userAPI.post('/register', payload);
    },
    fetchUserData(context, id) {
      context.commit('setLoading');
      return userAPI.get(`/findUser/${id}`);
    },
    // fetch products
    fetchListOfProducts(context) {
      context.commit('setLoading');
      productAPI.get()
        .then((response) => {
          context.commit('setListOfProducts', response.data);
        })
        .catch((err) => {
          context.commit('setError', err);
        })
        .finally(() => {
          context.commit('stopLoading');
        });
    },
    // edit cart
    editCart(context, payload) {
      context.commit('setLoading');
      return cartAPI.put(`/${payload.PersonId}/${payload.ProductId}`, payload, {
        headers: {
          token: localStorage.token,
        },
      });
    },
    // add cart
    addCart(context, payload) {
      context.commit('setLoading');
      return cartAPI.post('/', payload, {
        headers: {
          token: localStorage.token,
        },
      });
    },
    // delete cart
    deleteCart(context, payload) {
      context.commit('setLoading');
      return cartAPI.delete(`/${payload.PersonId}/${payload.ProductId}`, {
        headers: {
          token: localStorage.token,
        },
      });
    },
    // checkout cart
    checkoutCart(context, payload) {
      context.commit('setLoading');
      return cartAPI.put(`/${payload.PersonId}/${payload.ProductId}/checkout`, payload, {
        headers: {
          token: localStorage.token,
        },
      });
    },
  },
  modules: {
  },
});
