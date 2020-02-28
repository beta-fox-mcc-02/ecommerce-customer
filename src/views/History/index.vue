<template>
  <section id="history">
    <table>
      <thead class="centered highlight">
        <tr>
          <th></th>
          <th>Product Name</th>
          <th>quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, i) in history" :key="i">
          <td><img :src="cart.Product.image_url" width="100rem" alt="Product img"></td>
          <td>{{ cart.Product.name }}</td>
          <td>{{ cart.quantity }}</td>
          <td>{{ priceInRupiah(cart.total_price) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'History',
  methods: {
    priceInRupiah (price) {
      return 'Rp ' + Number(price).toLocaleString('id')
    }
  },
  computed: {
    history () {
      const history = []
      this.$store.state.carts.forEach(cart => {
        if (cart.status) history.push(cart)
      })
      return history
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
