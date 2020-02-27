<template>
  <tr>
    <td>
      <img :src="cart.Product.image_url" style="width: 100px; height: 100px">
    </td>
    <td>
      <!-- {{ total }} -->
      <div class="input-group" style="max-width: 140px; margin-left: auto; margin-right: auto">
        <div class="input-group-prepend">
          <button class="btn btn-outline-primary js-btn-minus" type="button" @click.prevent="setJumlah(-1)">&minus;</button>
        </div>
          <input
            readonly
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
      <h4>{{ priceTotal }}</h4>
    </td>
    <td>
      <a href="" @click.prevent="destroy(cart.id)"><i class="fas fa-trash-alt" style="font-size: 25px;"></i></a>
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
      } else if (this.total < 1) {
        this.total = 1
        this.$vToastify.warning('Masa beli minus sih boos')
      }
      this.updateQuantity()
    },
    updateQuantity () {
      this.$vToastify.loader('Please Wait...')
      const payload = {
        id: this.cart.id,
        quantity: this.total,
        price: this.cart.Product.price
      }
      this.$store.dispatch('update', payload)
        .then(data => {
          this.$store.dispatch('fetchCart')
            .then(({ data }) => {
              this.$vToastify.stopLoader()
              this.$store.commit('FETCH_CART', data.msg)
            })
            .catch(err => {
              this.$vToastify.warning({
                title: 'BRO',
                body: `${err.response.data.msg}`,
                type: 'warning',
                duration: 3000
              })
            })
        })
        .catch(err => {
          this.$vToastify.warning({
            title: 'BRO',
            body: `${err.response.data.msg}`,
            type: 'warning',
            duration: 3000
          })
        })
    },
    destroy (id) {
      this.$vToastify.loader('Please Wait...')
      this.$store.dispatch('destroy', id)
        .then(data => {
          this.$store.dispatch('fetchCart')
            .then(({ data }) => {
              this.$vToastify.stopLoader()
              this.$store.commit('FETCH_CART', data.msg)
              this.$vToastify.success('delete success')
            })
            .catch(err => {
              this.$vToastify.warning({
                title: 'BRO',
                body: `${err.response.data.msg}`,
                type: 'warning',
                duration: 3000
              })
            })
        })
        .catch(err => {
          this.$vToastify.warning({
            title: 'BRO',
            body: `${err.response.data.msg}`,
            type: 'warning',
            duration: 3000
          })
        })
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
