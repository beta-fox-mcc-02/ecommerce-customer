<template>
  <v-col cols="12">
    <Alert v-if="getMessage" />
    <v-card-text
      class="display-2 text-center"
      style="margin-bottom: 30px; font: Arial, Helvetica, sans-serif;">
      PRODUCTS
    </v-card-text>
    <Loading v-if="getLoadingState"/>
    <v-row v-else>
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
import Loading from '@/components/Loading.vue'

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    Product,
    Alert,
    Loading
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
    },
    getLoadingState () {
      return this.$store.state.loadingStatus
    }
  },
  created () {
    this.$store.commit('SET_LOADING_STATUS', true)
    this.fetchProduct()
  }
}
</script>

<style>

</style>
