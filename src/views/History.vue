<template>
  <v-card style="width:720px" class="container my-cart">
    <v-container style="width:700px">
      <h2 class="mb-3">Transaction History</h2>
      <v-progress-circular
        :size="30"
        color="grey"
        indeterminate
        style="margin-left:50%;"
        v-if="loading"
      ></v-progress-circular>
      <v-card class="mx-auto mb-2 mt-5" outlined v-for="cart in carts" :key="cart.id">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title
              class="headline mb-3"
            >invoice : {{cart.name[0]}}-{{new Date().getTime()}}</v-list-item-title>
            <div class="mb-3">
              <b>Product Name:</b>
              {{cart.name}}
            </div>
            <div class="mb-3">
              <b>Quantity:</b>
              {{cart.quantity}}
            </div>
            <div class="mb-3">
              <b>Price:</b>
              IDR {{cart.totalPrice.toLocaleString()}}
            </div>
            <div class="mb-3">
              <b>Date Purchased:</b>
              {{cart.updatedAt.split('T')[0]}}
            </div>
          </v-list-item-content>
          <v-list-item-avatar tile size="80">
            <img :src="cart.image_url" alt="John" />
          </v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {

  components: {
  },
  data: () => ({
    dialogDelete: false,
    cart: {}
  }),

  computed: {
    carts() {
      return this.$store.state.cart.filter(el => el.status === true)
    },
    loading() {
      return this.$store.state.loading
    }
  },

  created() {
    if (this.$store.state.cart.length === 0) {
      this.$store.dispatch('fetchCart')
    }
  },

  methods: {
  }
}
</script>

<style>
.my-checkout {
  background-color: #fec442 !important;
}
</style>
