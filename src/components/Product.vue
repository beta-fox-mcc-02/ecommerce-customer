<template>
  <div class="card-group">
    <div class="card-md">
      <div class="card-body">
        <img :src="product.image_url" alt="Gundam Image" style="max-height: 300px; max-width: 350px">
      </div>
    </div>
    <div class="card bg-ligt border-success">
      <div class="card-header">
      </div>
      <div class="card-body d-flex align-items-center">
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td>Gundam Name</td>
              <td>{{product.name}}</td>
            </tr>
            <tr>
              <td>Gundam Price</td>
              <td>{{product.price | currencyFormat}}</td>
            </tr>
            <tr>
              <td>Gundam Stock</td>
              <td>{{product.stock}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card bg-light border-success">
      <div class="card-header text-info">
        <h4>Put on Cart</h4>
      </div>
      <div class="card-body text-center">
        <b-form  @submit.prevent='buy(product.id)'>
          <label for="feedback-user">Quantity</label>
          <b-input v-model="quantity" :state="validation" id="feedback-user"></b-input>
          <b-form-invalid-feedback :state="validation">
            Your Quantity Exceeding our Stock.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
          <small>Total Price : Rp {{totalPrice}}</small>
          <br>
          <div class="text-right">
            <b-button type="submit"><i class="fas fa-cart-plus"> Add to Cart</i></b-button>
          </div>
          </b-form-valid-feedback>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      quantity: 0,
      costumer: 0
    }
  },
  methods: {
    currentCostumer () {
      this.costumer = this.$store.state.costumer
    },
    buy (id) {
      const inputCart = {
        CartId: this.costumer.Cart.id,
        ProductId: id,
        quantity: this.quantity
      }
      this.$store.dispatch('inputToCart', inputCart)
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCostumer')
    this.currentCostumer()
    // this.product()
  },
  filters: {
    currencyFormat (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  },
  computed: {
    totalPrice () {
      let product = {}
      for (let i = 0; i < this.$store.state.products.length; i++) {
        if (this.$store.state.products[i].id === +this.$route.params.id) {
          product = this.$store.state.products[i]
        }
      }
      return (this.quantity * product.price).toLocaleString('id')
    },
    validation () {
      // const currentStock = this.product()
      let product = {}
      for (let i = 0; i < this.$store.state.products.length; i++) {
        if (this.$store.state.products[i].id === +this.$route.params.id) {
          product = this.$store.state.products[i]
        }
      }
      return this.quantity <= product.stock
    },
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
