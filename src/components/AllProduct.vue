<template>
  <div id="allproducts">
    <Product  v-for="product in allProducts" :key="product.id" :product="product" />
  </div>
</template>

<script>
import Product from '../components/Product'

export default {
  name: 'AllProduct',
  components: {
    Product
  },
  data () {
    return {
      stock: ''
    }
  },
  computed: {
    allProducts () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
        .then(products => {
          // console.log(products.data.msg)
          this.$store.commit('FETCH_PRODUCTS', products.data.msg)
        })
        .catch(err => [
          console.log(err.response)
        ])
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style scoped>
#allproducts {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  overflow: auto;
}
</style>
