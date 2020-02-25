<template>
<div class="container">
    <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
            <b-carousel
                id="carousel-1"
                :interval="5000"
                controls
                indicators
                background="#ababab"
                img-width="920"
                img-height="350"
                style="text-shadow: 1px 1px 2px #333;"
            >
                <b-carousel-slide v-for="gundam in gundams" :key="gundam.id"
                    :caption="gundam.name"
                    text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                    style=" height: 350px; width: 920px; max-height: 350px; max-width: 920px"
                    :img-src="gundam.image_url"
                ></b-carousel-slide>
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
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
