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
  },
  actions: {
    login(context, payload) {
      context.commit('setLoading');
      return userAPI.post('/login', payload);
    },
    registerUser(context, payload) {
      context.commit('setLoading');
      return userAPI.post('/register', payload);
    },
  },
  modules: {
  },
});
