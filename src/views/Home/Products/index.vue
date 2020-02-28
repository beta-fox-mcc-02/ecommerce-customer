<template>
  <div id="products" class="col s9 center">
    <div class="col s3 center"
      v-for="product in filterProducts"
      :key="product.id"
    >
      <ProductCard
        :id="product.id"
        :name="product.name"
        :img_url="product.image_url"
        :price="product.price"/>
    </div>
  </div>

</template>

<script>
import ProductCard from './components/ProductCard'
export default {
  name: 'Products',
  components: {
    ProductCard
  },
  props: {
    categoryId: Number
  },
  computed: {
    filterProducts () {
      if (!this.$store.state.categoryId) return this.$store.state.products
      else {
        const filtered = []
        this.$store.state.products.forEach(product => {
          if (product.CategoryId === this.$store.state.categoryId) filtered.push(product)
        })
        return filtered
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
