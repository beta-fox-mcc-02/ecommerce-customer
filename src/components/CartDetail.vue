<template>
  <tr>
    <td class="text-center"><span><img :src="image" style="width: 40px; height: 40px"/></span></td>
    <td class="text-center">{{ cart.Product.name }} </td>
    <td class="text-center">{{ cart.Product.stock }}</td>
    <td class="text-center">{{ getProductPrice }}</td>
    <td class="text-center">
      <v-btn icon @click.prevent="substract"><v-icon color="primary">mdi-minus-box</v-icon></v-btn>
      {{ qty }}
      <v-btn icon @click.prevent="add"><v-icon color="primary">mdi-plus-box</v-icon></v-btn>
    </td>
    <td class="text-center">
      <v-btn icon @click.prevent="submitUpdate" v-if="checkStatus"><v-icon color="success">mdi-checkbox-marked</v-icon></v-btn>
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
    removeProduct () {
      this.$store.dispatch('removeFromCart', this.cart.id)
        .then(data => {

        })
        .catch(err => {
          console.log(err)
        })
    },
    showDeleteModal () {
      this.$emit('showDeleteModal', true)
    }
  },
  watch: {
    qty: function (val) {
      // console.log(val)
      if (val < 0) {
        this.qty = Math.abs(val)
      }
      if (val > this.cart.Product.stock) {
        this.qty = this.cart.Product.stock
      }
    }
  },
  computed: {
    getProductPrice () {
      return 'Rp ' + (+this.cart.Product.price).toLocaleString('id-ID')
    },
    getTotalPrice () {
      return 'Rp ' + (+this.cart.total).toLocaleString('id-ID')
    },
    checkStatus () {
      if (this.qty === this.newQty) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.qty = this.cart.qty
    this.newQty = this.qty
    // console.log(this.cart)
  }
}
</script>

<style>

</style>
