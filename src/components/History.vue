<template>
<div class="container mb-4">
    <br><br>
    <div class="row">
        <div class="col-12" style="overflow: auto">
            <div class="table-responsive bg-light text-center">
                {{costumer}}
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-right">Price</th>
                            <th scope="col">Date</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in costumer" :key="cart.id">
                            <td><img :src="cart.image_url" style="max-width:50px; max-height:50px"/> </td>
                            <td>{{cart.name}}</td>
                            <td>{{cart.quantity}}</td>
                            <td class="text-right">Rp. {{cart.Product.price | currencyFormat}}</td>
                            <td>{{cart.invoice}}</td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td>Total Credit</td>
                            <td v-if="costumer.length" class="text-right">Rp. {{sumSubPrice | currencyFormat}}</td>
                            <td v-if="!costumer.length" class="text-right">Rp. 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <router-link to="/"><button class="btn btn-block btn-light">Continue Shopping</button></router-link>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button @click="checkout(costumer)" class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('fetchCostumer')
    this.$store.dispatch('fetchHistory')
  },
  filters: {
    currencyFormat (val) {
      return val.toLocaleString('id')
    }
  },
  computed: {
    costumer () {
      const history = []
      console.log(this.$store.state.history)
      for (let i = 0; i < this.$store.state.history.length; i++) {
        if (this.$store.state.history[i].CartId === this.$store.state.costumer.Cart.id) {
          history.push(this.$store.state.history[i])
        }
      }
      console.log(history)
      return history
    },
    price (quantity, price) {
      return (quantity * price).toLocaleString('id')
    },
    sumSubPrice () {
      const price = []
      for (let i = 0; i < this.history.length; i++) {
        const temp = this.history[i].price * this.history[i].quantity
        price.push(temp)
      }
      const subPrice = price.reduce((a, b) => {
        return a + b
      })
      return subPrice
    }
  }
}
</script>

<style>

</style>
