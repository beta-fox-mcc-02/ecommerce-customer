<template>
  <div class="container">
    <h1 class="title">Your Order History</h1>
    <!-- v-for="order in Orders" :key="order.id" -->
    <div class="card" v-for="order in orders" :key="order.id">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <p class="title is-6">Order ID</p>
                <p class="subtitle is-6">{{ order.id }}</p>
              </div>
              <div class="column">
                <p class="title is-6">
                  Total
                </p>
                <p class="subtitle is-6">
                  {{ formatIDR(order.totalPrice) }}
                </p>
              </div>
              <div class="column">
                <button
                  class="button is-pulled-right"
                  @click="showDetail(order.id)"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Orders',
  created: function() {
    // panggil api
    this.$store
      .dispatch('getOrders')
      .then(orders => {
        console.log(orders)
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    orders: function() {
      return this.$store.state.orders
    }
  },
  methods: {
    formatIDR: function(money) {
      let reverse = money
        .toString()
        .split('')
        .reverse()
        .join('')
      let ribuan = reverse.match(/\d{1,3}/g)
      ribuan = ribuan
        .join('.')
        .split('')
        .reverse()
        .join('')
      return 'Rp. ' + ribuan
    },
    showDetail: function(id) {
      this.$router.push(`/orders/${id}`)
    }
  }
}
</script>
