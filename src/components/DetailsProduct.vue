<template>
  <div class="detail-product">
    <div class="gambar">
      <img :src="product.image_url">
    </div>
    <div class="detail">
      <h1>{{product.name}}</h1>
      <h3>{{product.price}}</h3>
      <p>{{product.stock}} items ready</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsProduct',
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  created () {
    this.$store.dispatch('fetchOneProduct', this.$route.params.id)
  }
}
</script>

<style>

</style>
