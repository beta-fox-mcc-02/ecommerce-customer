<template>
  <div>
    <div class="image">
      <img :src="product.image_url">
    </div>
    <div class="named">
      <p>{{product.name}}</p>
      <p>{{product.price | currencyFormat}}</p>
    </div>
    <div class="add-to-cart">
      <button @click="addToCart(product)">Add To Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemProduct',
  data () {
    return {
    }
  },
  props: {
    product: Object
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  },
  methods: {
    addToCart (product) {
      console.log(product)
      // cart.push(product)
      // console.log('CART')
      // console.log(cart)
      // this.$store.dispatch('addToCart', cart)

      const cart = this.$store.state.cart

      var productIndex
      var productExist = cart.filter(function (item, index) {
        if (item.product.id === Number(product.id)) {
          productIndex = index
          return true
        } else {
          return false
        }
      })

      if (productExist.length) {
        cart[productIndex].qty++
      } else {
        cart.push({ product: product, qty: 1 })
      }
      this.$store.dispatch('addToCart', cart)
    }
  }
}
</script>

<style>
  .image {
    width: 100%;
  }
  .image img {
    width: 100%;
    height: 341px;
  }
  .add-to-cart {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .add-to-cart button {
    margin-bottom: 20px;
  }
</style>
