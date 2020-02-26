import Vue from "vue";
import Vuex from "vuex";
import axios from "../api/axiosInstance";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    loading: false,
    isLogin: false,
    cart: []
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_A_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_LOGIN(state, payload){
      state.isLogin = payload
    },
    SET_CART(state, payload){
      state.cart = payload
    }
  },
  actions: {
    fetchProduct({ commit }) {
      commit("SET_LOADING", true);
      axios({
        method: "get",
        url: "/product"
      })
        .then(({ data }) => {
          commit("SET_LOADING", false);
          commit("SET_PRODUCTS", data);
        })
        .catch(err => {
          commit("SET_LOADING", false);
          console.log(err);
        });
    },
    getProduct(context, id) {
      context.commit("SET_LOADING", true);
      axios({
        method: "get",
        url: `/product/${id}`
      })
        .then(({ data }) => {
          context.commit("SET_LOADING", false);
          context.commit("SET_A_PRODUCT", data);

        })
        .catch(err => {
          context.commit("SET_LOADING", false);
          console.log(err);

        });
    },
    getCart(context){
      context.commit("SET_LOADING", true);
      axios({
        method: "get",
        url: `/cart`,
        headers:{
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit("SET_LOADING", false);
          context.commit("SET_CART", data);
          // console.log(data);
          

        })
        .catch(err => {
          context.commit("SET_LOADING", false);
          console.log(err);

        });
    }
  },
  modules: {}
});
