<template>
  <div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    :interval="4000"
    background="#ababab"
    img-width="1024"
    img-height="480"
    indicators
  >
    <b-carousel-slide
      :caption="slide.caption"
      v-for="(slide, index) in slides" :key="index">
      <template v-slot:img>
        <img
          class="d-block img-carousel img-fluid w-100"
          width="1024"
          height="480"
          :src="slide.image"
        >
      </template>
      <router-link to="/products">
        <b-button variant="success" size="lg">Shop now</b-button>
      </router-link>
    </b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      slides: [
        {
          image: require('../assets/images/slide-1.jpg'), caption: 'Follow Keeping Through Technology'
        },
        {
          image: require('../assets/images/slide-2.jpg'), caption: 'Yours Precision Crafted Performance'
        },
        {
          image: require('../assets/images/slide-3.jpg'), caption: 'Always Choose Original Parts'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-carousel {
    filter: brightness(60%);
  }
</style>
