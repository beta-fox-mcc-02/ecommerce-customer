<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                <router-link to="/">Home</router-link>
            </b-navbar-item>
            <b-navbar-item href="#">
                <router-link to="/cart">Cart</router-link>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a v-if="(!isLogin)" class="button is-primary">
                        <strong>
                            <router-link to="/register">Register</router-link>
                        </strong>
                    </a>
                    <a v-if="(!isLogin)" class="button is-light">
                        <router-link to="/login">Login</router-link>
                    </a>
                    <a @click.prevent="logout" v-if="(isLogin)" class="button is-danger">
                        Logout
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
    }
  }
}
</script>

<style>

</style>
