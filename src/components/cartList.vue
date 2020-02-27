<template>
  <tr>
    <td>
      <img :src="product.image" width="50" alt="avatar" srcset="">
    </td>
    <td>
      {{ product.name }}
    </td>
    <td><input type="number" style="width: 2rem;" v-model="quantity"> pcs</td>
    <!-- {{ product.stock }} -->
    <td>Rp {{ product.price }}</td>
    <td>
      <!-- <v-icon class="pointer mx-1 hvr" small>mdi-trash</v-icon> -->
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
    deleteFromCart (id) {
      this.$store.dispatch('deleteFromCart', id)
        .then(({ data }) => {
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
        })
    },
    updateCart () {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      this.$store.dispatch('updateCart', {
        ProductId: this.product.id,
        quantity: this.quantity
      })
        .then(({ data }) => {
          loader.hide()
          console.log(data)
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
  },
  watch: {
    quantity: function (val) {
      this.updateCart()
    }
  }
}
</script>

<style>

</style>
