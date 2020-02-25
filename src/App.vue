<template>
  <div id="app">
    <Alert />
    <Loading />
    <router-view/>
  </div>
</template>

<script>
import Alert from './components/Alert.vue';
import Loading from './components/Loading.vue';

export default {
  components: {
    Alert,
    Loading,
  },
};
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
