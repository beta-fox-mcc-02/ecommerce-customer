<template>
  <div class="group-card">
    <div class="kotak" v-for="product in products" :key="product.id" @click="showProduct(product.id)">
      <Card :product="product"></Card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'Product',
  components: {
    Card
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    // this.$store.dispatch('fetchProduct')
  }
}
</script>

<style>
  .group-card {
    /* overflow: scroll; */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /* flex-wrap: wrap; */
    width: 100%;
    height: 100%;
  }
  .card {
    flex-basis: 33.3%;
    min-width: 300px;
  }
  .kotak {
    position: relative;
    flex-basis: 33.3%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    min-width: 300px;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    margin-right: 10px;
  }
  .kotak:last-child {
    margin-right: 0;
  }
</style>
