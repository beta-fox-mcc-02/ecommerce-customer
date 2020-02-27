<template>
  <div class="text-left container my-3 py-3 shadow p-3 mb-5 rounded box-view">
    <div class="head">
      <span style="font-size: 25px; font-weight: 600;">My Cart</span>
    </div>
    <Loading v-if="loading"/>
    <div class="afterload" v-else>
      <div class="no-cart my-5 text-center" v-if="carts.length === 0">
        <h4>Nothing in Transactions &#128546;</h4>
        <router-link to="/products">Buy Something Here</router-link>
      </div>
      <div class="content" v-else>
        <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"/>
        <div class="text-right mr-5 my-4">
        <h5>Total Price : Rp. {{ totalPrice }},-</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import CartCard from '../components/TransactionCard'
export default {
  name: 'CartPage',
  components: {
    CartCard,
    Loading
  },
  computed: {
    carts () {
      return this.$store.state.transactions
    },
    totalPrice () {
      let total = 0
      const carts = this.carts
      for (let i = 0; i < carts.length; i++) {
        total += carts[i].quantity * carts[i].Product.price
      }
      return (total).toLocaleString("id-ID")
    },
    loading () {
      return this.$store.state.loading
    }
  },
  created () {
    this.$store.dispatch('fetchTransaction')
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.token) {
      next()
    } else {
      Toastify({
        text: 'You Must Login First',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        className: 'error'
      }).showToast()
      if (from.path === '/products') {
        next('/products')
      } else {
        next('/')
      }
    }
  }
}
</script>

<style scoped>

.checkout:hover {
  background: rgb(95, 255, 47) !important;
}

a {
  font-weight: 700;
  cursor: pointer;
  color: white;
  text-decoration: none;
}

a:hover {
  color: aqua;
}
</style>
