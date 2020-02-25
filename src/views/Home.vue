<template>
<section class="home overflow-auto">
  <br>
  <center>
    <div class="card card-signup z-depth-0 bg-transparent" style="max-height : 806px; max-width : 1400px">
        <div class="card-header text-center">
            <Carousel></Carousel>
        </div>
        <div class="card-body">
          <router-view></router-view>
        </div>
    </div>
  </center>
</section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import RegisterCost from '@/components/Register.vue'
import Carousel from '../components/Carousel.vue'
export default {
  name: 'Home',
  data () {
    return {
      token: localStorage.token
    }
  },
  components: {
    // RegisterCost
    Carousel
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
</style>
