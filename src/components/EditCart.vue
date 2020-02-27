<template>
    <div>
        {{cart}}
        <b-card
            title="Card Title"
            v-bind:img-src="cart.Product.image_url"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'EditCart',
  data () {
    return {
      quantity: this.cart.quantity
    }
  },
  created () {
    this.$store.dispatch('viewCart', this.$route.params.id)
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>

<style>

</style>
