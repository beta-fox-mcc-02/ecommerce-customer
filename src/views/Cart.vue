<template>
  <div class="Cart-container">
    <div class="left">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Qty</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CustomerProduct v-for="cart in carts" :key="cart.id" :cart="cart" />
        </tbody>
      </table>
    </div>
    <div class="right">
      {{ carts }}
    </div>
  </div>
</template>

<script>
import CustomerProduct from '../components/CustomerProduct'

export default {
  name: 'Cart',
  components: {
    CustomerProduct
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
          this.$store.commit('FETCH_CART', data.msg)
        })
        .catch(err => {
          console.log(err)
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
  height: 78vh;
  border: 1px solid red;
}

.Cart-container div {
  border: 1px solid black;
  height: 78vh;
}

.left {
  width: 120vh;
}

.right {
  width: 75vh
}
</style>
