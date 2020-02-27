<template>
  <tr>
    <td class="text-center"><span><img :src="getImageUrl" style="width: 40px; height: 40px"/></span></td>
    <td class="text-center">{{ getProductName }} </td>
    <td class="text-center">{{ getProductStock }}</td>
    <td class="text-center">{{ getProductPrice }}</td>
    <td class="text-center">
      <v-btn icon @click.prevent="substract" :disabled="buttonPrevState"><v-icon color="primary">mdi-minus-box</v-icon></v-btn>
      {{ qty }}
      <v-btn icon @click.prevent="add" :disabled="buttonNextState" ><v-icon color="primary">mdi-plus-box</v-icon></v-btn>
    </td>
    <td class="text-center">
      <v-btn icon @click.prevent="submitUpdate" :disabled="buttonCheckStatus"><v-icon color="success">mdi-checkbox-marked</v-icon></v-btn>
      <v-btn icon @click.prevent="removeProduct"><v-icon color="red">mdi-delete</v-icon></v-btn>
    </td>
    <td class="text-center">{{ getTotalPrice }}</td>
  </tr>
</template>

<script>
export default {
  data () {
    return {
      qty: 0,
      newQty: ''
    }
  },
  props: ['cart'],
  methods: {
    add () {
      this.qty++
    },
    substract () {
      this.qty--
    },
    resetQty () {
      this.qty = 0
    },
    submitUpdate () {
      const payload = {
        id: this.cart.id,
        price: this.cart.Product.price,
        qty: this.qty
      }
      this.$store.dispatch('updateCart', payload)
        .then(({ data }) => {
          // console.log(data.data[0])
          this.qty = data.data[0].qty
          const payload = {
            key: data.data.id,
            value: data.data.qty
          }
          this.$store.commit('SET_CART_STATUS', payload)
          this.newQty = data.data[0].qty
          this.$emit('fetchCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    removeProduct () {
      this.$store.dispatch('removeFromCart', this.cart.id)
        .then(data => {
          console.log(data)
          this.$store.dispatch('fetchCart')
            .then(cart => {
              this.$store.commit('SET_CART', data.data)
              this.qty = 0
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    showDeleteModal () {
      this.$emit('showDeleteModal', true)
    }
  },
  watch: {
    qty: function (val) {
      // console.log(val)
      if (val < 1) {
        this.qty = 1
      }
      if (val > this.getProductStock) {
        this.qty = this.getProductStock
      }
    },
    buttonCheckStatus: function (val) {
      // console.log(val, this.cart.id)
      // if (!this.$store.state.cartStatus[this.cart.id]) {
      const payload = {
        key: this.cart.id,
        value: val
      }
      // console.log(payload)
      this.$store.commit('SET_CART_STATUS', payload)
      // }
    }
  },
  computed: {
    getProductPrice () {
      if (this.cart.Product.price) {
        return 'Rp ' + (+this.cart.Product.price).toLocaleString('id-ID')
      } else {
        return ''
      }
    },
    getProductName () {
      if (this.cart.Product.name) {
        return this.cart.Product.name
      } else {
        return ''
      }
    },
    getProductStock () {
      if (this.cart.Product.stock) {
        return this.cart.Product.stock
      } else {
        return ''
      }
    },
    getTotalPrice () {
      if (this.qty === this.cart.Product.Stock) {
        return 'Rp ' + (+this.cart.total).toLocaleString('id-ID')
      } else {
        return 'Rp ' + (+this.cart.Product.price * this.qty).toLocaleString('id-ID')
      }
    },
    getImageUrl () {
      if (this.cart.Product.image_url) {
        return this.cart.Product.image_url
      } else {
        return ''
      }
    },
    buttonCheckStatus () {
      // console.log(this.qty, this.newQty)
      if (this.qty === this.newQty) {
        return true
      } else {
        return false
      }
    },
    buttonPrevState () {
      if (this.qty <= 1) {
        return true
      }
      return false
    },
    buttonNextState () {
      if (this.qty >= this.getProductStock) {
        return true
      }
      return false
    }
  },
  created () {
    // console.log(this.cart.qty, 'dari cart detail created')
    this.qty = this.cart.qty ? this.cart.qty : 0
    this.newQty = this.qty
    // console.log(this.qty)
    // console.log(this.cart)
  }
}
</script>

<style>

</style>
