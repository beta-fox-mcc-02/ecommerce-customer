<template>
  <div>
    <b-container>
    <h2 style="padding-top:20px;">Transactions</h2>
    <table class="table">
      <thead>
        <th>No</th>
        <th>Id</th>
        <th>Transaction date</th>
        <th>Products</th>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="transaction.id">
          <td>{{ index + 1 }}</td>
          <td>{{ transaction.id }}</td>
          <td>{{ transaction.updatedAt | formatDate }}</td>
          <td>
            <th>Name</th>
            <th>Quantity</th>
            <th class="text-right">Price</th>
            <th class="text-right">Total</th>
            <tr v-for="product in transaction.CartDetails" :key="product.id">
              <td>{{ product.Product.name }}</td>
              <td class="text-center">{{ product. quantity }}</td>
              <td class="text-right">{{ product.price | formatCurrency }}</td>
              <td class="text-right">{{ product.total | formatCurrency }}</td>
            </tr>
          </td>
        </tr>
        <tr v-if="!transactions">
          <td colspan="4">There is no transactions</td>
        </tr>
      </tbody>
    </table>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Profile',
  created () {
    this.$store.dispatch('fetchHistoryCarts')
      .then(response => {
        this.$store.commit('SET_TRANSACTIONS', response.data)
        this.$store.commit('SET_LOADING_CART', false)
      })
      .catch(err => {
        this.$store.commit('SET_LOADING_CART', false)
        this.$store.commit('SET_ERRORS', err.response)
      })
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    transactions () {
      return this.$store.state.transactions
    }
  },
  filters: {
    formatCurrency (value) {
      const price = new Intl.NumberFormat('id-ID').format(value)
      return 'Rp ' + price
    },
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY hh:mm')
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('checkAuthenticated')
        .then(response => {
          vm.$store.commit('SET_AUTHENTICATED', true)
          vm.$store.commit('SET_LOADING_AUTHENTICATION', false)
          vm.$store.commit('SET_USER', response.data)
          next()
        })
        .catch((err) => {
          vm.$store.commit('SET_AUTHENTICATED', false)
          vm.$store.commit('SET_LOADING_AUTHENTICATION', false)
          vm.$store.commit('SET_USER', {})
          vm.$store.commit('SET_ERRORS', err.response)
          vm.$router.push('/login')
        })
    })
  }
}
</script>
