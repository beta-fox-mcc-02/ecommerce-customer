<template>
  <b-col sm="4">
    <CircularLoading v-if="isLoading && !product"/>
    <div class="card-wrapper">
      <img
        class="d-block img-fluid w-100"
        :src="product.ProductImages[0].url"
        :alt="product.name"
      >
      <b-card
        v-if="!isLoading && product"
        :title="product.name"
        tag="article"
        class="mb-2"
      >
        <b-card-text>
        {{ product.price | formatCurrency }}
        </b-card-text>
        <b-button href="#" variant="primary">Buy now</b-button>
      </b-card>
    </div>
  </b-col>
</template>

<script>
import CircularLoading from '../components/CircularLoading'
export default {
  name: 'Product',
  components: {
    CircularLoading
  },
  props: {
    product: Object
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  filters: {
    formatCurrency (value) {
      const price = new Intl.NumberFormat('id-ID').format(value)
      return 'Rp ' + price
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    border: none;
    &-wrapper {
      flex: 1 1 auto;
      min-height: 1px;
      padding: 1.5rem;
    }
  }
</style>
