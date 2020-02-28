<template>
<div>
  <div id="quantity-input" class="col s3 center">
    <button
      class="waves-effect waves-blue btn-floating-small blue lighten-5 black-text"
      @click.prevent="removeQuantity"
    >
      <i class="material-icons">remove</i>
    </button>
    <div class="input-field inline">
      <input class="center" id="quantity" type="number" min="1" :max="max" v-model="quantity" disabled>
    </div>
    <button
      class="waves-effect waves-blue btn-floating-small blue lighten-5 black-text"
      @click.prevent="addQuantity"
    >
      <i class="material-icons">add</i>
    </button>
  </div>
  <div id="add-cart" class="col s3">
    <a
      class="waves-effect waves-blue btn blue lighten-5 black-text"
      @click.prevent="addCart"
    >
    <i class="material-icons left">add_shopping_cart</i>Add to Cart</a>
  </div>
  <div id="total-price" class="col 3">
    <h6>Total Price: {{ totalPrice }}</h6>
  </div>
</div>
</template>

<script>
export default {
  name: 'QuantityInput',
  data () {
    return {
      quantity: 1
    }
  },
  props: {
    max: Number,
    price: Number
  },
  methods: {
    addQuantity () {
      let increment = 1
      if (this.quantity === this.max) increment = 0
      this.quantity += increment
    },
    removeQuantity () {
      let decrement = 1
      if (this.quantity === 1) decrement = 0
      this.quantity -= decrement
    },
    addCart () {
      const totalprice = this.quantity * this.price
      const payload = {
        productId: this.$route.params.productId,
        quantity: this.quantity,
        total_price: totalprice
      }
      this.$store.dispatch('addCart', payload)
        .then(() => {
          this.$store.dispatch('fetchOneProduct', this.$route.params)
          this.$store.commit('SUCCESS', 'Adding cart success')
          this.$emit('buy')
        })
        .catch(err => this.$store.commit('ERROR', err))
    }
  },
  computed: {
    totalPrice () {
      return 'Rp ' + (this.price * this.quantity).toLocaleString('id')
    }
  }
}
</script>

<style scoped>
  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}

#add-cart a {
  margin: 2rem
}

#total-price h6 {
  margin: 2rem
}
</style>
