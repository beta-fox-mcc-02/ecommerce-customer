<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      :interval="3000"
      img-height="480"
    >
      <b-carousel-slide
        img-src="../assets/banner1.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="../assets/banner2.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="../assets/banner3.jpg"
      ></b-carousel-slide>
    </b-carousel>
</div>
</template>

<script>
export default {

};
</script>

<style>

</style>
