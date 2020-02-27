<template>
  <div class="home">
    <div v-if="(isLogin)" class="products">
      <Products v-for="product in products" :key="product.id"
      :product='product'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue'

export default {
  name: 'Home',
  components: {
    Products
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style scoped>
/* div {
  background-image: url('https://i.pinimg.com/originals/eb/09/85/eb098576a0c618c99ee86406a8815c64.png');
  background-size: cover
} */
div {
  display: flex;
}
</style>
