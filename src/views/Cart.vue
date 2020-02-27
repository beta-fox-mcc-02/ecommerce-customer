<template>
  <div class="cart">
      <table class="table">
          <thead>
              <tr>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total Price</th>
              </tr>
          </thead>
          <tbody v-for="{id, Product, amount, total, price} of listCart " :key="id">
              <tr>
                  <td class="image"><img :src="Product.image_url"></td>
                  <td>{{Product.name}}</td>
                  <td>{{Product.author}}</td>
                  <td>Rp. {{price.toLocaleString()}}</td>
                  <td>{{amount}}</td>
                  <td>Rp. {{priceTotal(total)}}</td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                <td colspan="6">
                <div style="float: right">
                <span>Total : Rp. {{+totalPrice}}</span>
                <br/><br/>
                <div class="buttons">
                    <b-button type="is-success" @click="checkout">Checkout</b-button>
                </div>
                </div>
                </td>
              </tr>
          </tfoot>
      </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalPrice: 0
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  },
  computed: {
    listCart () {
      return this.$store.state.cart
    }
  },
  methods: {
    priceTotal (total) {
      this.totalPrice = total
      return total.toLocaleString()
    },
    checkout () {
      const payload = {
        cart: this.$store.state.cart
      }
      this.$store.dispatch('fetchCheckout', payload)
        .then(_ => {
          this.$buefy.toast.open({
            duration: 3000,
            message: 'success checkout cart',
            position: 'is-top',
            type: 'is-success'
          })
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 3000,
            message: err.response.data.message,
            position: 'is-top',
            type: 'is-danger'
          })
        })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
