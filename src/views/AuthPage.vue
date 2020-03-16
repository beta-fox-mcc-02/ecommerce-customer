<template>
  <v-row
    align="center"
    justify="center">
    <v-col
      cols="12"
      sm="8"
      md="4">
      <router-view/>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Auth',
  created () {
    // this.$store.commit('SET_MESSAGE', { msg: '', status: null })
  },
  components: {
  },
  beforeRouteEnter (from, to, next) {
    if (localStorage.access_token) {
      next('/products')
    } else {
      next()
    }
  }
}
</script>

<style>

</style>
