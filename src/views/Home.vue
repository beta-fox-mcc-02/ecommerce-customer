<template>
<section class="home overflow-auto">
  <br>
  <center>
    <div class="card card-signup z-depth-0 bg-transparent" style="max-height : 806px; max-width : 1400px">
        <div class="card-header text-center">
            <Carousel></Carousel>
        </div>
        <div class="card-body">
            <b-spinner v-if="isLoading" class="text-light" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
          <router-view v-if="!isLoading"></router-view>
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
      token: localStorage.token,
      isLoading: true
    }
  },
  components: {
    // RegisterCost
    Carousel
  },
  methods: {
    loading () {
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCarousel')
    this.loading()
  }
}
</script>

<style>
</style>
