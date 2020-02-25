<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('SET_IS_LOGIN', true)
      // this.$router.push({ name: this.$store.state.currentPage })
    } else {
      this.$store.commit('SET_IS_LOGIN', false)
      // this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.btn-2 {
  font-size: 2rem;
}

.btn-2:hover {
  cursor: pointer;
}
</style>
