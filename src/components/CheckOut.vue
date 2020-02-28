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
      const payload = {
        UserId: this.carts[0].User.id
      }
      this.$store.dispatch('payment', payload)
        .then(data => {
          this.$store.dispatch('fetchCart')
            .then(({ data }) => {
              this.$vToastify.stopLoader()
              this.$vToastify.success('Payment Success')
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
          this.$vToastify.stopLoader()
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
    fetchTotalPrice () {
      let price = 0
      for (let i = 0; i < this.carts.length; i++) {
        price += this.carts[i].price
      }
      return price.toLocaleString()
    }
  }
}
</script>

<style>

</style>
