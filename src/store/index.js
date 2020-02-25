import Vue from 'vue';
import Vuex from 'vuex';
import userAPI from '../API/userAPI';

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
  },
  modules: {
  },
});
