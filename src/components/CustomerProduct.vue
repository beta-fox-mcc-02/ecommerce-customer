<template>
  <tr>
    <td>
      <img :src="cart.Product.image_url" style="width: 70px; height: 70px">
    </td>
    <td>
      <div class="input-group" style="max-width: 140px; margin-left: auto; margin-right: auto">
        <div class="input-group-prepend">
          <button class="btn btn-outline-primary js-btn-minus" type="button" @click.prevent="setJumlah(-1)">&minus;</button>
        </div>
          <input
            type="number"
            min="1" :max="cart.Product.stock"
            class="form-control text-center"
            v-model="total"
            placeholder
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
        <div class="input-group-append">
          <button class="btn btn-outline-primary js-btn-plus" type="button" @click.prevent="setJumlah(1)">&plus;</button>
        </div>
      </div>
    </td>
    <td>
      {{ priceTotal }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CustomerProduct',
  props: ['cart'],
  data () {
    return {
      total: this.cart.quantity
    }
  },
  methods: {
    setJumlah (num) {
      this.total = this.total + num
      if (this.total > this.cart.Product.stock) {
        this.total = this.cart.Product.stock
        this.$vToastify.warning('stock not available')
      }
      if (this.total < 1) {
        this.total = 1
        this.$vToastify.warning('Masa beli minus sih boos')
      }
    }
  },
  computed: {
    priceTotal () {
      return this.total * this.cart.Product.price
    }
  }
}
</script>

<style>

</style>
