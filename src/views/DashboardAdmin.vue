<template>
  <div class="admin-dashboard">
    <NavbarAdmin />
    <div class="header-admin shadow">
      <small>.</small>
      <h1
        style="margin-top: 140px; font-family: 'Merriweather', serif;"
        class="text-center shadow"
      >We create something great together.</h1>
    </div>

    <div class="container">

      <router-view />
    
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import NavbarAdmin from '../components/NavbarAdmin'
export default {
  name: 'AdminDashboard',
  components: {
    NavbarAdmin
  },
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch("getAllItem");
  },
  computed: {
    allItem () {
      return this.$store.state.allProduct
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.isAdmin) {
      next('/')
    } else {
      next()
    }
  }
}
</script>

<style scoped>
.header-admin {
  min-height: 60vh;
  /* background-image: url("https://i.gifer.com/CWyf.gif"); */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('https://i.gifer.com/CWyf.gif');
  background-size: cover;
  background-position: 0px -150px;
}

h1 {
  color: white; 
  text-shadow: 3px 2px #4e50b1;
}

h1:hover {
  color: #f3e961;
}
</style>
