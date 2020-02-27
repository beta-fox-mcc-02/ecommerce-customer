<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProductsAsync')
    }
  },
  created () {
    this.fetchProducts()
    const token = localStorage.getItem('token')
    if (token) this.$store.commit('setLoginStatus', true)
    else this.$store.commit('setLoginStatus', false)
  }
}
</script>

<style>

*{
  margin: 0;
  font-family: 'Times New Roman', Times, serif;
}

button, a{
  cursor: pointer;
}

</style>
