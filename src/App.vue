<template>
  <div id="app">
    <Navbar/>
    <LoginCard v-if="showLogin" @close="loginTrigger"/>
    <CartModal v-if="showCart" @close="cartTrigger"/>
    <!-- <div id="nav">
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import M from 'materialize-css'// load javascript from materialize
import Navbar from './components/Navbar.vue'
import LoginCard from '@/components/LoginCard.vue'
import CartModal from './components/CartModal'
export default {
  name: 'App',
  components: {
    Navbar,
    LoginCard,
    CartModal
  },
  methods: {
    loginTrigger () {
      this.$store.commit('loginTrigger')
    },
    cartTrigger () {
      this.$store.commit('CART_TRIGGER')
    }
  },
  props: {
    username: String
  },
  computed: {
    showLogin () {
      return this.$store.state.showLogin
    },
    showCart () {
      return this.$store.state.showCart
    }
  },
  mounted () {
    M.AutoInit()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
