<template>
  <v-row>
    <v-col>
      <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Price</th>
              <th class="text-left">Total</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
      </v-simple-table>
      <v-flex
        flex-end
        style="margin-top: 20px">
        <v-btn
          color="success"
          @click.prevent="checkout">
          Checkout
        </v-btn>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    fetchCart () {

    },
    checkout () {

    }
  },
  computed: {
    getCart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>
