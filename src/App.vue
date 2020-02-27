<template>
  <div id="app">
    <Navbar :userEmail="personData.email" :userProducts="notPaidProduct" />
    <Alert />
    <Loading />
    <router-view style="margin-top: 80px" />
  </div>
</template>

<script>
import Alert from './components/Alert.vue';
import Loading from './components/Loading.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Alert,
    Loading,
    Navbar,
  },
  computed: {
    personData() {
      return this.$store.state.personData;
    },
    paidProduct() {
      return this.$store.getters.paidProduct;
    },
    notPaidProduct() {
      return this.$store.getters.notPaidProduct;
    },
  },
  created() {
    if (localStorage.token) {
      this.$store.dispatch('fetchUserData', localStorage.person_id)
        .then((response) => {
          this.$store.commit('setLogin', response.data);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          this.$store.commit('stopLoading');
        });
    }
    this.$store.dispatch('fetchListOfProducts');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');

body {
  background: #f6f5f7;
}

h1 {
  font-weight: 700;
  margin: 15px 0;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
