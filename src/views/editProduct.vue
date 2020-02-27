<template>
  <div id="addProduct">
    <form @submit.prevent="editProduct">
      <h3>Edit Product</h3>
      <div class="form-group">
        <h4>Name</h4>
        <input v-model="product.name" id="add-title" type="text" class="form-control" style="width: auto;" />
      </div>
      <div class="form-group">
        <h4>Image URL</h4>
        <input v-model="product.image_url" id="add-title" type="text" class="form-control" style="width: auto;" />
      </div>
      <div class="form-group">
        <h4>Stock</h4>
        <input v-model="product.stock" id="add-title" type="text" class="form-control" style="width: auto;" />
      </div>
      <div class="form-group">
        <h4>Price</h4>
        <input v-model="product.price" id="add-title" type="text" class="form-control" style="width: auto;" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'editProduct',
  data () {
    return {
      name: '',
      image_url: '',
      stock: '',
      price: ''
    }
  },
  methods: {
    editProduct () {
      const { id, name, image_url, stock, price } = this.product
      const productData = { id, name, image_url, stock, price }
      console.log(id, '+++')
      this.$store.dispatch('editProduct', productData)
    }
  },
  computed: {
    product () {
      return this.$store.state.productDetails
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
</style>
