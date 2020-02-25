<template>
  <div class="border rounded product-card-container" v-if="products.length">
    <div class="card card-container" v-for="product in products" :key="product.id">
      <img :src="product.image_url" class="card-image">
      <div class="card-body">
        <div class="card-title">{{ product.name }}</div>
        <div class="card-text">
          price: {{ product.price }}
          stock: {{ product.stock }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
.product-card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-container {
  width: 20%;
  margin: 20px;
}

.card-image{
  height: 175px;
}
</style>
