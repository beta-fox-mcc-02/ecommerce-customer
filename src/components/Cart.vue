<template>
<div>
    <div
    class="container"
    v-for="cart in carts"
    :key="cart.id"
    >
        <b-card no-body class="overflow-hidden m-2 p-1" style="max-width: 740px;">
            <b-row no-gutters>
                <b-col md="4">
                    <b-card-img v-bind:src="cart.Product.image_url" class="rounded-0"></b-card-img>
                </b-col>
                <b-col class="m-1 p-1" md="6">
                    <b-card-body v-bind:title="cart.Product.name">
                    <b-card-text>
                       quantity : {{cart.quantity}}
                    </b-card-text>
                    </b-card-body>
                </b-col>
                <b-col md="1" >
                    <b-button tag="router-link" :to="`/cart/edit/${cart.id}`" variant="success">Edit</b-button>
                    <b-button @click="deleteCart(cart.id)" class="m-1" variant="danger">Delete</b-button>
                </b-col>
            </b-row>
        </b-card>
    </div>
    <router-view />
</div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('viewAllCart', this.id)
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    id () {
      return this.$store.state.costumerId
    }
  }
}
</script>

<style>

</style>
