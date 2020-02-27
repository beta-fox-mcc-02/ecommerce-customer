<template>
<v-container
    fluid
>
  <v-carousel
        cycle
        height="488"
        hide-delimiters
        show-arrows-on-hover
    >
        <v-carousel-item
            v-for="(carousel, i) in carouselItems"
            :key="i"
            :src="carousel.bg"
        >
        </v-carousel-item>
    </v-carousel>
</v-container>
</template>

<script>
export default {
  computed: {
    carouselItems () {
      return this.$store.state.carouselItems
    }
  }
}
</script>
