<template>
  <div>
    <h1>Checkout</h1>
    <table class="table table-hover">
      <caption class="text-right h3">
        <b>Total:</b>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-right">Price</th>
          <th scope="col" class="text-right">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-info">+</button>
              <button class="btn btn-outline-info">-</button>
            </div>
          </td>
          <th scope="row">{{ item.product.name }}</th>
          <th class="text-center">{{ item.qty }}</th>
          <th class="text-right">{{ item.product.price }}</th>
          <th class="text-right">{{ item.product.price * item.qty }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Checkout',
  computed: {
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>

<style>

</style>
