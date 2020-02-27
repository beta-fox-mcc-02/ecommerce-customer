<template>
  <div id="quantity-input" class="col s3">
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
    max: Number
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
</style>
