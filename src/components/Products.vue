<template>
  <!-- This card will be looped -->
        <div class="col-4 mb-4">
            <div class="card text-center">
              <img
                :src= product.image_url
                class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.price }}</p>
                <p class="card-text">{{ product.stock }}</p>
                <button @click.prevent="toEditProduct" class="btn btn-primary">Edit</button> <br>
                <button @click.prevent="deleteProduct(product.id)" class="btn btn-primary">Delete</button>
              </div>
            </div>
        </div>
        <!-- This card wilsl be looped -->
</template>

<script>

export default {
  name: 'Product',
  props: ['product'],
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    toEditProduct () {
      const productData = {
        id: this.product.id,
        name: this.product.name,
        image_url: this.product.image_url,
        stock: this.product.stock,
        price: this.product.price
      }
      console.log(productData, 'PRODYCT DATAA')
      this.$store.commit('TO_EDIT_PRODUCT', productData)
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  }
}
</script>

<style scoped>

</style>
