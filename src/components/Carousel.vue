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
      caption="Follow Keeping Through Technology">
      <template v-slot:img>
        <img
          class="d-block img-carousel img-fluid w-100"
          width="1024"
          height="480"
          src="../assets/images/slide-1.jpg"
        >
      </template>
    </b-carousel-slide>
    <b-carousel-slide
      caption="Yours Precision Crafted Performance"
    >
     <template v-slot:img>
        <img
          class="d-block img-carousel img-fluid w-100"
          width="1024"
          height="480"
          src="../assets/images/slide-2.jpg"
        >
      </template>
    </b-carousel-slide>
    <b-carousel-slide
      caption="Always Choose Original Parts"
    >
      <template v-slot:img>
        <img
          class="d-block img-carousel img-fluid w-100"
          width="1024"
          height="480"
          src="../assets/images/slide-3.jpg"
        >
      </template>
    </b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style lang="scss" scoped>
  .img-carousel {
    filter: brightness(60%);
  }
</style>
