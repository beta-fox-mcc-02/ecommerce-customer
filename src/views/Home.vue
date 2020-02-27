<template>
  <div class="home">
    <!-- <Header /> -->
    <banner />
    <product />
    <router-view />
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
          this.$store.commit('SET_LOADING_FETCH_PRODUCTS', false)
        })
        .catch(({ response }) => {
          this.$store.commit('SET_LOADING_FETCH_PRODUCTS', false)
        })
    }
  },
  created () {
    this.fetchProducts()
  },
  computed: {
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center
}
</style>
