import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// import interceptors from './helpers/interceptors'
import store from './store'
import router from './router'
// interceptors()
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
