<template>
  <v-row
    align="center"
    justify="center">
    <router-view/>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // this.$store.commit('SET_MESSAGE', { msg: '', status: null })
  }
}
</script>

<style>

</style>
