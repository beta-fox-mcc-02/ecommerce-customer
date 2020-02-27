<template>
  <div>
    <v-app-bar clipped-left>
      <v-toolbar-title><router-link to="/" id="logo">PLAY.ME</router-link></v-toolbar-title>
      <div class="flex">
        <router-link to="/products" class="navbar"><v-btn icon @click="resetMessage"><v-icon>mdi-shopify</v-icon></v-btn></router-link>
        <div v-if="!getStateLogin">
          <router-link to="/users/login" class="navbar"><v-btn icon @click="resetMessage">Login</v-btn></router-link>
          <router-link to="/users/register" class="navbar"><v-btn icon @click="resetMessage">Register</v-btn></router-link>
        </div>
        <div v-else>
          <router-link to="/profiles" class="navbar"><v-btn icon @click="resetMessage"><v-icon>mdi-account-circle</v-icon></v-btn></router-link>
          <router-link to="/carts" class="navbar"><v-btn icon><v-icon>mdi-cart</v-icon></v-btn></router-link>
        <v-btn @click.prevent="logingOut" class="navbar" icon><v-icon>mdi-logout</v-icon>Log out</v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    logingOut () {
      localStorage.clear()
      this.$router.push('/')
      this.$store.commit('SET_MESSAGE', { msg: 'success log out', status: true })
      this.$store.commit('SET_ISLOGIN', false)
    },
    resetMessage () {
      this.$store.commit('SET_MESSAGE', { msg: '', status: null })
    }
  },
  computed: {
    getStateLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
  }
}
</script>

<style>
  .flex {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .link {
    margin: 0px 100px
  }
  #logo {
    text-decoration: none
  }
  .navbar {
    text-decoration: none;
    margin-left: 50px;
    margin-right: 20px
  }
</style>
