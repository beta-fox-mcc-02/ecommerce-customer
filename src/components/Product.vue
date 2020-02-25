<template>
  <div>
     <b-card  img-alt="Card image"  class="mb-3" >
         <b-img :src="product.image_url" style=" height: 350px; width: 650px; max-height: 350px; max-width: 650px" img-left></b-img>
      <b-card-text>
        <b-table striped hover>
            <tr>
                <td>Name  : {{product.name}}</td>
            </tr>
            <tr>
                <td>Price : Rp {{product.price.toLocaleString('id')}}</td>
            </tr>
            <tr>
                <td>Stock : {{product.stock}}</td>
            </tr>
        </b-table>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('fetchProducts')
    // this.product()
  },
  computed: {
    product () {
      let product = {}
      for (let i = 0; i < this.$store.state.products.length; i++) {
        if (this.$store.state.products[i].id === +this.$route.params.id) {
          product = this.$store.state.products[i]
        }
      }
      return product
    }
  }
}
</script>

<style>

</style>
