<template>
  <div>
    <h3>Total Payment:</h3>
    <h2>{{ fetchTotalPrice }}</h2>
    <button class="btn btn-primary" @click.prevent="toPayment">Payment</button>
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
  props: ['carts'],
  methods: {
    toPayment () {
      this.$vToastify.loader('Please Wait...')
      // console.log(this.carts[0].User.id)
      const payload = {
        UserId: this.carts[0].User.id,
        carts: this.carts
      }
      this.$store.dispatch('payment', payload)
        .then(data => {
          // console.log(data)
          this.$store.dispatch('fetchCart')
            .then(({ data }) => {
              this.$vToastify.stopLoader()
              this.$vToastify.success('Payment Success')
              this.$store.commit('FETCH_CART', data.msg)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  computed: {
    fetchTotalPrice () {
      let price = 0
      for (let i = 0; i < this.carts.length; i++) {
        price += this.carts[i].price
      }
      return price
    }
  }
}
</script>

<style>

</style>
