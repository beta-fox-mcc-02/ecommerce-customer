<template>
  <div id="app">
    <Navbar @showModal="showModal" :showRegister="showRegister" />
    <router-view/>
    <Register v-if="showRegister"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Register from './components/Register'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Navbar,
    Register
  },
  methods: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

#app {
  text-align: center;
  margin-top: 150px;
}
</style>
