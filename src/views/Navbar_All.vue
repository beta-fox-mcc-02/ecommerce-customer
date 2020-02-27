<template>
  <b-navbar class="navbar is-white" style="z-index: 10;">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt="GramediYou" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-dropdown label="Category">
        <b-navbar-item href="#">Books</b-navbar-item>
        <b-navbar-item href="#">Magazine</b-navbar-item>
        <b-navbar-item href="#">Pens</b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button class="button is-success" icon-left="cart" @click="cart" v-if="page === 'home'" :disabled="disable" rounded>
            <strong>Cart</strong>
            <!-- <router-link to="cart" style="color: white;"><strong>Cart</strong></router-link> -->
          </b-button>
          <button class="button is-link" @click="login" v-if="page === 'register'">
            <router-link to="login" style="color: white;"><strong>Login</strong></router-link>
          </button>
          <button class="button is-warning" @click="register" v-else-if="page === 'login'">
            <router-link to="register" style="color: black;"><strong>Register</strong></router-link>
          </button>
          <button class="button is-danger" @click="logout" v-else>
            <router-link to="login" style="color: white;"><strong>Log Out</strong></router-link>
          </button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar_All',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('CHANGE_PAGE', 'login')
      this.$router.push({ path: '/login' })
    },
    login () {
      this.$store.commit('CHANGE_PAGE', 'login')
    },
    register () {
      this.$store.commit('CHANGE_PAGE', 'register')
    },
    cart () {
      this.$store.commit('CHANGE_PAGE', 'cart')
      this.$router.push({ path: '/cart' })
    }
  },
  computed: {
    page () {
      return this.$store.state.page
    },
    disable () {
      if (this.$store.state.cart.length > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>
