<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-container
        class="fill-height"
        > <!-- class="fill-height" -->
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    Navbar
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_ISLOGIN', true)
    } else {
      this.$store.commit('SET_ISLOGIN', false)
    }
  },
  beforeRouteEnter (from, to, next) {
    if (localStorage.access_token) {
      next('/products')
    } else {
      next('/users/login')
    }
  }
}
</script>
