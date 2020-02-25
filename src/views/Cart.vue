<template>
  <div class="container">
    <h1 class="title">Your Cart</h1>
    <div class="card" v-for="item in cartItems" :key="item.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                :src="item.Product.image_url"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <p class="title is-6">{{ item.Product.name }}</p>
                <p class="subtitle is-6">Qty: {{ item.quantity }}</p>
              </div>
              <div class="column">
                <p class="subtitle is-6"> Sub Total: {{ item.Product.price * item.quantity }}</p>
              </div>
              <div class="column">
                <button class="button is-pulled-right">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Cart',
  created: function() {
    // panggil api
    this.$store
      .dispatch('getCart')
      .then(cart => {
        console.log(cart)
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    cartItems: function() {
      return this.$store.state.cart.CartItems
    }
  }
}
</script>
