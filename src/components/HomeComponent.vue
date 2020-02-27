<template>
  <div class="component"
    style="margin-top: 127px"
  >
      <HomeCarousel />
      <HomeBanner />
      <NewProduct />
  </div>
</template>

<script>
import HomeCarousel from './HomeCarousel'
import HomeBanner from './HomeBanner'
import NewProduct from './NewProduct'

export default {
  name: 'Home',
  components: {
    HomeCarousel,
    HomeBanner,
    NewProduct
  },
  methods: {
    fetchCartData () {
      this.$emit('fetchCartData')
    }
  },
  created () {
    document.title = 'Foot-Style'
  }
}
</script>

<style>

</style>
