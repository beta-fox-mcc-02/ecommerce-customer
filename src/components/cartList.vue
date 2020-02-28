<template>
  <tr ref="cart">
    <td>
      <img :src="product.image" width="50" alt="avatar" srcset="">
    </td>
    <td>
      {{ product.name }}
    </td>
    <td>
      <v-icon @click="minus">mdi-minus</v-icon>
      <input type="number" style="width: 2rem; text-align: center;" v-model="quantity">
      <v-icon @click="plus">mdi-plus</v-icon>
    </td>
    <!-- {{ product.stock }} -->
    <td>Rp {{ product.price }}</td>
    <td>
      <a href="#" @click="deleteFromCart(product.id)">Delete</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CartList',
  data () {
    return {
      quantity: this.product.ProductTransaction.quantity
    }
  },
  props: {
    product: Object
  },
  methods: {
    minus () {
      this.quantity--
    },
    plus () {
      this.quantity++
    },
    deleteFromCart (id) {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      this.$store.dispatch('deleteFromCart', id)
        .then(({ data }) => {
          loader.hide()
          console.log('delete from cart', data)
          this.$store.dispatch('fetchCart')
          this.$notify({
            group: 'sign',
            title: 'Delete cart',
            text: data.msg,
            type: 'success'
          })
        })
        .catch(err => {
          if (err.response) console.log(err.respons)
          else console.log(err)
          loader.hide()
        })
    },
    updateCart () {
      if (this.quantity > this.product.stock || this.quantity < 0) {
        this.$notify({
          group: 'sign',
          title: 'Update quantity',
          text: 'Gagal guys',
          type: 'error'
        })
        this.quantity = 0
      } else {
        console.log('ini refs', this.$refs.formContainer)
        const loader = this.$loading.show({
          container: this.$refs.cart
        })
        this.$store.dispatch('updateCart', {
          ProductId: this.product.id,
          quantity: this.quantity
        })
          .then(({ data }) => {
            loader.hide()
            console.log(data)
            this.$store.dispatch('fetchCart')
            this.$notify({
              group: 'sign',
              title: 'Update quantity',
              text: data.msg,
              type: 'success'
            })
          })
          .catch(err => {
            loader.hide()
            if (err.response) console.log(err.respons)
            else console.log(err)
          })
      }
    }
  },
  watch: {
    quantity: function (val) {
      this.updateCart()
    }
  }
}
</script>

<style scoped>
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
