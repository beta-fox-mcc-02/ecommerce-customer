<template>
  <v-col cols="12">
    <Alert v-if="getMessage" />
    <v-card-text
      class="display-2 text-center"
      style="margin-bottom: 30px; font: Arial, Helvetica, sans-serif;">
      PRODUCTS
    </v-card-text>
    <v-row>
    <Product
    v-for="product in getProducts.data"
    :key="product.id"
    :product="product">
    </Product>
    </v-row>
  </v-col>
</template>

<script>
import Product from '@/components/Product.vue'
import Alert from '@/components/Alert.vue'

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    Product,
    Alert
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    getProducts () {
      return this.$store.state.products
    },
    getMessage () {
      return this.$store.state.message
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>

</style>
