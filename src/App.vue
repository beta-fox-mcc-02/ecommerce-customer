<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" to="/">
          Home
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link to="/cart" class="button">
              <span class="icon is-small">
                <i class="mdi mdi-cart"></i>
              </span>
            </router-link>
            <router-link
              v-if="!$store.state.token"
              to="/register"
              class="button is-primary"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link
              v-if="!$store.state.token"
              to="/login"
              class="button is-light"
            >
              Log in
            </router-link>
            <button
              class="button is-light"
              v-if="$store.state.token"
              @click="logout"
            >
              Log out
            </button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
