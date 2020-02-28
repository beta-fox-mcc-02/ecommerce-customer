<template>
  <div>
    <h1>Checkout</h1>
    <button @click="checkoutProcess">Checkout</button>
    <table class="table table-hover">
      <caption class="text-right h3">
        <b>Total: {{ cartTotal | currencyFormat}}</b><br>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Img</th>
          <th scope="col" class="text-center">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-right">Price</th>
          <th scope="col" class="text-right">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <!-- <div v-if="item.qty > 0"> -->
            <td v-if="item.qty > 0">
              <div class="btn-group">
                <button class="btn btn-info" @click="addProduct(index)">+</button>
                <button class="btn btn-outline-info" @click="minusProduct(index)">-</button>
              </div>
            </td>
            <td class="text-center" v-if="item.qty > 0">
              <div class="gambarMe" >
                <img class="gambarku" :src="item.product.image_url">
              </div>
            </td>
            <th scope="row" v-if="item.qty > 0">{{ item.product.name }}</th>
            <th class="text-center" v-if="item.qty > 0">{{ item.qty }}</th>
            <th class="text-right" v-if="item.qty > 0">{{ item.product.price | currencyFormat}}</th>
            <th class="text-right" v-if="item.qty > 0">{{ item.product.price * item.qty | currencyFormat}}</th>
          <!-- </div> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Checkout',
  methods: {
    addProduct (index) {
      const cart = this.$store.state.cart
      for (let i = 0; i < cart.length; i++) {
        if (index === i) {
          cart[i].qty++
          const payload = {
            cart: cart[i],
            productId: cart[i].product.id
          }
          this.$store.dispatch('updateQtyProduct', payload)
        }
      }
    },
    minusProduct (index) {
      const cart = this.$store.state.cart
      for (let i = 0; i < cart.length; i++) {
        if (index === i) {
          cart[i].qty--
          console.log(cart[i].qty, 'INI LOH =======>>>>>')
          const payload = {
            cart: cart[i],
            productId: cart[i].product.id
          }
          this.$store.dispatch('updateQtyProduct', payload)
        }
      }
    },
    checkoutProcess () {
      this.$dispatch('checkoutAllItems')
    }
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    cartTotal () {
      let sum = 0
      const cart = this.$store.state.cart
      for (let i = 0; i < cart.length; i++) {
        sum = sum + (cart[i].product.price * cart[i].qty)
      }
      return sum
    }
  },
  watch: {
    cart: function (val) {
      return this.$store.state.cart
    },
    cartTotal: function (val) {
      return val
    }
  }
}
</script>

<style scoped>
  .gambarMe img {
    width: 50px;
    height: 50px;
  }
</style>
