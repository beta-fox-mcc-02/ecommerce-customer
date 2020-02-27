<template>
  <div>{{ user }}</div>
</template>

<script>
export default {
  name: 'Profile',
  created () {
    this.$store.dispatch('fetchHistoryCarts')
      .then(response => {
        this.$store.commit('SET_LOADING_CART', false)
        console.log(response)
      })
      .catch(err => {
        this.$store.commit('SET_LOADING_CART', false)
        this.$store.commit('SET_ERRORS', err.response)
      })
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
