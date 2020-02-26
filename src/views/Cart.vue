<template>
  <div class="container">
    <h1 class="title">Your Cart</h1>
    <div class="card" v-for="item in cartItems" :key="item.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="item.Product.image_url" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <p class="title is-6">{{ item.Product.name }}</p>
                <p class="subtitle is-6">Qty: {{ item.quantity }}</p>
              </div>
              <div class="column">
                <p class="title is-6">
                  Sub Total
                </p>
                <p class="subtitle is-6">
                  {{ formatIDR(item.Product.price * item.quantity) }}
                </p>
              </div>
              <div class="column">
                <button class="button is-pulled-right">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- summary below here -->
    <hr />
    <div class="card" v-if="cartItems.length > 0">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <p class="title is-6">Summary</p>
              </div>
              <div class="column">
                <p class="title is-6">
                  Total Items
                </p>
                <p class="subtitle is-6">
                  {{ totalItems }}
                </p>
              </div>
              <div class="column">
                <p class="title is-6">
                  Total Payment
                </p>
                <p class="subtitle is-6">
                  {{ formatIDR(totalPrice) }}
                </p>
              </div>
              <div class="column">
                <button
                  class="button is-primary is-pulled-right"
                  @click="checkout"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="subtitle">Your cart is empty</h1>
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
    },
    totalItems: function() {
      return this.$store.getters.totalItems
    },
    totalPrice: function() {
      return this.$store.getters.totalPrice
    },
    cart: function() {
      return this.$store.state.cart
    }
  },
  methods: {
    formatIDR: function(money) {
      let reverse = money
        .toString()
        .split('')
        .reverse()
        .join('')
      let ribuan = reverse.match(/\d{1,3}/g)
      ribuan = ribuan
        .join('.')
        .split('')
        .reverse()
        .join('')
      return 'Rp. ' + ribuan
    },
    checkout: function() {
      // ambil shoppingcartid
      // abis itu di get ajah
      this.$store
        .dispatch('checkout', this.cart.id)
        .then(result => {
          console.log('berhasil', result)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
