<template>
  <tr>
    <td class="text-center"><span><img :src="image" style="width: 40px; height: 40px"/></span></td>
    <td class="text-center">{{ cart.Product.name }} </td>
    <td class="text-center">{{ cart.Product.stock }}</td>
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
      newQty: '',
      image: this.cart.Product.image_url
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
          // this.$store.dispatch('fetchCart')
          //   .then(({ data }) => {
          //     console.log(data)
          //     this.$store.commit('SET_CART', data.data)
          //     data.data.forEach(product => {
          //       this.total += product.total
          //     })
          //   })
          //   .catch(err => {
          //     console.log(err.response)
          //   })
          this.$emit('fetchCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    removeProduct () {
      this.$store.dispatch('removeFromCart', this.cart.id)
        .then(data => {

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
      if (val > this.cart.Product.stock) {
        this.qty = this.cart.Product.stock
      }
    },
    buttonCheckStatus: function (val) {
      // console.log(val, this.cart.id)
      // if (!this.$store.state.cartStatus[this.cart.id]) {
      const payload = {
        key: this.cart.id,
        value: val
      }
      this.$store.commit('SET_CART_STATUS', payload)
      // }
    }
  },
  computed: {
    getProductPrice () {
      return 'Rp ' + (+this.cart.Product.price).toLocaleString('id-ID')
    },
    getTotalPrice () {
      if (this.qty === this.cart.Product.Stock) {
        return 'Rp ' + (+this.cart.total).toLocaleString('id-ID')
      } else {
        return 'Rp ' + (+this.cart.Product.price * this.qty).toLocaleString('id-ID')
      }
    },
    buttonCheckStatus () {
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
      if (this.qty >= this.cart.Product.stock) {
        return true
      }
      return false
    }
  },
  created () {
    // console.log(this.cart.qty, 'dari cart detail created')
    this.qty = this.cart.qty
    this.newQty = this.qty
    // console.log(this.cart)
  }
}
</script>

<style>

</style>
