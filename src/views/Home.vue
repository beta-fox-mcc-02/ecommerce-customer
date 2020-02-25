<template>
  <v-row
    align="center"
    justify="center">
    <v-col
      cols="12"
      sm="8"
      md="4">
      <Alert v-if="getMessage" style="width: 400px"/>
      <img :src="getCarousel" :alt="carouselTitle" style="width: 400px; height: 250px">
      <v-btn class="btn btn-primary" @click.prevent="prev">Prev</v-btn>
      <v-btn class="btn btn-primary" @click.prevent="next">Next</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Alert from '@/components/Alert.vue'
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      carousel: [
        'https://akcdn.detik.net.id/community/media/visual/2019/05/03/df6af1b5-8c91-4f60-a6ca-34182a9f42d7_169.jpeg?w=600&q=90',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgjZJ47Jmpx2sK8bKn0OiPT2GPUmVqkTNzZGVeghTFyiQWD1z&s',
        'https://steamcdn-a.akamaihd.net/steam/apps/582010/header.jpg?t=1582071559'
      ],
      carouselTitle: [
        'Dota 2',
        'GTA 5',
        'Monster Hunter World'
      ],
      index: 0
    }
  },
  components: {
    Alert
  },
  methods: {
    next () {
      ++this.index
      if (this.index === this.carousel.length) {
        this.index = 0
      }
    },
    prev () {
      --this.index
      if (this.index === -1) {
        this.index = this.carousel.length - 1
      }
    }
  },
  computed: {
    getCarousel () {
      return this.carousel[this.index]
    },
    getMessage () {
      return this.$store.state.message
    }
  }
}
</script>
