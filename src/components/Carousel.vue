<template>
<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
            <b-carousel
                id="carousel-1"
                :interval="5000"
                controls
                indicators
                background="#ababab"
                img-width="650"
                img-height="350"
                style="text-shadow: 1px 1px 2px #333; max-width: 650px"
            >
                <b-carousel-slide v-for="gundam in gundams" :key="gundam.id"
                    style=" height: 350px; width: 650px; max-height: 350px; max-width: 920px"
                    :img-src="gundam.image_url"
                >
                <a :href="gundam.url" class="text-light">
                  <h1>{{gundam.title}}</h1>
                </a>
                  <p>{{gundam.synopsis}}</p>
                </b-carousel-slide>
            </b-carousel>
        </div>
        <div class="col-sm-1"></div>
    </div>
</div>
</template>

<script>
export default {
  computed: {
    gundams () {
      return this.$store.state.carousel
    }
  }
}
</script>

<style>
 .carousel-item img {
   max-height: 350px
 }

</style>
