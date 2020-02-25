<template>
  <div id="app">
    <Nav id="nav"></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Navbar'
export default {
  components: {
    Nav
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('ISLOGIN', true)
    }
  }
}
</script>

<style>
/* .bg {
    background-image: url("https://wallpaperplay.com/walls/full/c/f/1/342017.jpg"); */
    /* background-image: url("https://66.media.tumblr.com/6094cf11d9e52372fabae77e79e6615f/tumblr_o091zw1UiV1qd4yt6o1_1280.jpg"); */
    /* height: 100%; */
    /* background-position: center; */
    /* background-repeat: no-repeat;
    background-size: cover;
} */

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
  color: #cdcdce;
}

#nav a.router-link-exact-active {
  color: #50b98a;
}
</style>
