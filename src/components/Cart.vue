<template>
<div class="container mb-4">
    <br><br>
    <div class="row">
        <div class="col-12" style="overflow: auto">
            <div class="table-responsive bg-light text-center">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col">Available</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-right">Price</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in costumer" :key="cart.id">
                            <td><img :src="cart.Product.image_url" style="max-width:50px; max-height:50px"/> </td>
                            <td>{{cart.Product.name}}</td>
                            <td>In stock</td>
                            <td>{{cart.quantity}}</td>
                            <td class="text-right">Rp. {{cart.Product.price.toLocaleString('id')}}</td>
                            <td class="text-right"><button @click="cancelProduct(cart.Cart.id, cart.Product.id)" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td>Sub-Total</td>
                            <td class="text-right">Rp. {{sumSubPrice | currencyFormat}}</td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td>Shipping</td>
                            <td class="text-right">Rp. 50.000</td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td><strong>Total</strong></td>
                            <td class="text-right"><strong>Rp. {{totalPrice | currencyFormat}}</strong></td>
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
                    <button @click="checkout" class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
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
  methods: {
    cancelProduct (CartId, ProductId) {
      const deleteProduct = {
        CartId,
        ProductId
      }
      //   console.log(id)
      this.$store.dispatch('cancelProduct', deleteProduct)
    },
    checkout () {

    }
  },
  created () {
    this.$store.dispatch('fetchCostumer')
    this.$store.dispatch('fetchCart')
  },
  filters: {
    currencyFormat (val) {
      return val.toLocaleString('id')
    }
  },
  computed: {
    costumer () {
      return this.$store.state.carts
    },
    price (quantity, price) {
      return (quantity * price).toLocaleString('id')
    },
    sumSubPrice () {
      const price = []
      for (let i = 0; i < this.$store.state.carts.length; i++) {
        const temp = this.$store.state.carts[i].Product.price * this.$store.state.carts[i].quantity
        price.push(temp)
      }
      const subPrice = price.reduce((a, b) => {
        return a + b
      })
      return subPrice
    },
    totalPrice () {
      return this.sumSubPrice + 50000
    }
  }
}
</script>

<style>

</style>
