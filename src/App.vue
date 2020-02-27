<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div> -->
    <navbarHome
    style="
    position: fixed;
    top: 0px;
    width: 100%;"
    />
    <router-view />
    <footerHome/>
  </div>
</template>
<script>
import navbarHome from './components/navbarHome'
import footerHome from './components/footerHome'
export default {
  components:{
    navbarHome,
    footerHome
  },
  created: function(){
    if(localStorage.token){
      this.$store.commit('SET_LOGIN', true)
    }
  }
};
</script>
<style>
#app {
  font-family: Poppins;
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
</style>
