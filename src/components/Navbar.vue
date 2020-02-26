<template>
  <nav id="headmenu">
    <section id="left-menu">
      <router-link to="/" class="logo"><i class="fas fa-home"></i> ECOMMERCE</router-link>
    </section>
    <section id="right-menu">
      <ShopperMenu  v-if="isLoggedIn" />
      <SightSeer  v-if="!isLoggedIn" />
    </section>
  </nav>
</template>

<script>
import ShopperMenu from '../components/MemberNavbar.vue'
import SightSeer from '../components/InitialNavbar.vue'

export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.loginStatus
    }
  },
  components: { ShopperMenu, SightSeer }
}
</script>

<style scoped>

nav#headmenu {
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4b698e;
}

section#right-menu, section#left-menu {
    height: 100%;
}

.logo {
    display: flex;
    height: inherit;
    align-items: center;
    margin-left: 1rem;
    font-size: 18pt;
    color: white;
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    width: 100%;
}

</style>
