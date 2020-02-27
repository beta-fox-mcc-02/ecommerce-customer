<template>
  <div class="container">
    <Carousel/>
    <MenBox/>
    <LadiesBox/>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel'
import MenBox from '../components/MenBox'
import LadiesBox from '../components/LadiesBox'

export default {
  name: 'Home',
  components: {
    MenBox,
    Carousel,
    LadiesBox
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
