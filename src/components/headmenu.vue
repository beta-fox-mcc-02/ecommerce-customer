<template>
  <nav id="headmenu">
    <section id="left-menu">
      <div class="menu">left menu</div>
    </section>
    <section id="center-menu">
      <div class="menu">center menu</div>
    </section>
    <section id="right-menu">
      <ShopperMenu  v-if="isLoggedIn" />
      <SightSeer  v-if="!isLoggedIn" />
    </section>
  </nav>
</template>

<script>
import ShopperMenu from '../components/shopper.vue'
import SightSeer from '../components/sightSeer.vue'

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

section#right-menu, section#center-menu, section#left-menu {
    height: 100%;
}

</style>
