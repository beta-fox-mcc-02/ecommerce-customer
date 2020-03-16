<template>
  <v-alert :type="getAlert">
      {{ getMessage }}
  </v-alert>
</template>

<script>
export default {
  computed: {
    getAlert () {
      return this.$store.getters.getAlert
    },
    getMessage () {
      return this.$store.state.message
    }
  }
}
</script>

<style>

</style>
