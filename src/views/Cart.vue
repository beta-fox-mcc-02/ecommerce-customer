<template>
  <div class="Cart-container">
    {{ cart }}
    <CustomerProduct class="left"/>
    <!-- <div class="left">KIRI</div> -->
    <div class="right">KANAN</div>
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
    cart () {
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
