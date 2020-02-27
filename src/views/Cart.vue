<template>
  <div class="Cart-container">
    <div class="left">
      <table style="width: 120vh;">
        <thead>
          <tr>
            <th>Image</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CustomerProduct v-for="cart in carts" :key="cart.id" :cart="cart" />
        </tbody>
      </table>
      <CheckOut :carts="carts"/>
    </div>
  </div>
</template>

<script>
import CustomerProduct from '../components/CustomerProduct'
import CheckOut from '../components/CheckOut'

export default {
  name: 'Cart',
  components: {
    CustomerProduct,
    CheckOut
  },
  computed: {
    carts () {
      return this.$store.state.cart
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
        .then(({ data }) => {
          this.$vToastify.stopLoader()
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
    }
  },
  created () {
    if (localStorage.token) {
      this.fetchCart()
    } else {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
.Cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px
}

.Cart-container div {
  border: none;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.40);
  padding: 10px;
}

.left {
  width: 120vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
