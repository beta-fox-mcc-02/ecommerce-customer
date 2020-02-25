<template>
  <div class="home">
    <!-- <Header /> -->
    <banner />
    <product />
  </div>
</template>

<script>
// import Header from '../components/Header'
import Banner from '../components/Banner'
import Product from '../components/Product'

export default {
  name: 'Home',
  components: {
    // Header,
    Banner,
    Product
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data.data)
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center
}
</style>
