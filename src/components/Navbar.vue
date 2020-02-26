<template>
<div id="navbar">
  <nav>
    <div class="nav-wrapper blue-grey darken-4">
      <a id="logo" class="brand-logo"><img src="public/favicon.ico" alt="CE8"></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="isLogin"><h5>{{ username }}</h5></li>
        <li v-if="!isLogin"><a @click.prevent="loginTrigger" class="waves-effect waves-blue btn-flat modal-trigger blue lighten-5">Login</a></li>
        <li v-if="isLogin"><a class="waves-effect waves-blue btn-flat blue lighten-5" @click.prevent="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      username: localStorage.username
    }
  },
  methods: {
    loginTrigger () {
      this.$store.commit('loginTrigger')
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$store.commit('SUCCESS', { message: 'Logout success' })
      this.$store.commit('LOGIN_CHECK')
      this.$router.push('/')
    }
  },
  computed: {
    showLogin () {
      return this.$store.state.showLogin
    },
    isLogin () {
      console.log(this.$store.isLogin)
      return this.$store.state.isLogin
    }
  },
  created () {
    this.$store.commit('LOGIN_CHECK')
  }
}
</script>

<style scoped>
  #logo {
    margin: 0 3rem
  }
</style>
