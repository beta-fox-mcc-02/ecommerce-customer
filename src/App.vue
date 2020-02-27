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
      // this.$router.push({ name: 'Home' })
    } else {
      this.$store.commit('SET_IS_LOGIN', false)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

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

.anchor {
  color: #2c3e50
}

.anchor:hover {
  color: #475766
}
</style>
