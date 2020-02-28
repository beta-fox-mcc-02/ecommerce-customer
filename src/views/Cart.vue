<template>
  <div class="cart">
    <table class="table">
        <thead>
        <tr>
            <th>Book Image</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total Price</th>
            <th>Option</th>
        </tr>
        </thead>
        <tbody v-for="{id, Product, amount, total, price} of listCart " :key="id">
        <tr>
            <td class="image"><img :src="Product.image_url"></td>
            <td>{{Product.name}}</td>
            <td>{{Product.author}}</td>
            <td>Rp. {{price.toLocaleString()}}</td>
            <td>
                <a @click="addReduce(id, amount - 1, Product.price)" >
                    <b-icon icon="minus-circle" type="is-danger" ></b-icon>
                </a>
                <strong>{{amount}}</strong>
                <a @click="addReduce(id, amount + 1)">
                    <b-icon icon="plus-circle" type="is-success"></b-icon>
                </a>
            </td>
            <td>Rp. {{amount * Product.price}}</td>
            <td>
                <a @click="deleteCart(id)"><b-icon icon="delete" type="is-danger" ></b-icon></a>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
        <td colspan="7">
        <div style="float: right">
        <span>Total : Rp. {{total.toLocaleString()}}</span>
        <br/><br/>
        <div class="buttons">
            <b-button type="is-success" @click="checkout">Checkout</b-button>
        </div>
        </div>
        </td>
        </tr>
        </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalPrice: 0
    }
  },
  computed: {
    listCart () {
      return this.$store.state.cart
    },
    total () {
      let temp = 0
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        temp += (this.$store.state.cart[i].amount * this.$store.state.cart[i].Product.price)
      }
      return temp
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('fetchCheckout')
        .then(_ => {
          this.$buefy.toast.open({
            duration: 3000,
            message: 'success checkout cart',
            position: 'is-top',
            type: 'is-success'
          })
          this.$store.dispatch('fetchProduct')
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 3000,
            message: err.response.data.message,
            position: 'is-top',
            type: 'is-danger'
          })
        })
      this.$router.push({ path: '/' })
    },
    addReduce (id, update, price) {
      if (update > 0) {
        const payload = {
          id,
          update
        }
        this.$store.dispatch('updateAmount', payload)
          .then(data => {
            this.$store.dispatch('fetchCart')
          })
          .catch(err => {
            this.$buefy.toast.open({
              duration: 3000,
              message: err.response.data.message,
              position: 'is-top',
              type: 'is-danger'
            })
          })
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: 'amount cant less than 1',
          position: 'is-top',
          type: 'is-danger'
        })
      }
    },
    deleteCart (id) {
      const payload = {
        id
      }
      this.$buefy.dialog.confirm({
        title: 'Deleting Product',
        message: 'Are you sure you want to <b>delete</b> this product? This action will delete this product permanently',
        confirmText: 'Delete Product',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteCart', payload)
            .then(({ data }) => {
              this.$buefy.toast.open({
                duration: 3000,
                message: data.message,
                position: 'is-top',
                type: 'is-success'
              })
              this.$store.dispatch('fetchCart')
            })
            .catch(err => {
              this.$buefy.toast.open({
                duration: 3000,
                message: err.response.data.message,
                position: 'is-top',
                type: 'is-danger'
              })
            })
        }
      })
    }
  },
  created () {
    if (this.$store.state.cart[0] === undefined) {
      this.$router.push({ path: '/' })
    }
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>

</style>
