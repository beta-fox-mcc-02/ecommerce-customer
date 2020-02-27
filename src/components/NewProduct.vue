<template>
  <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="1300"
  >
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ message }}
    </v-snackbar>
    <v-card-title
        class="title text-center"
    >
        New Product
    </v-card-title>
    <v-slide-group
      v-model="model"
      class="mx-auto"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="product in products"
        :key="product.id"
      >
        <v-card
            class="ma-5"
            color="grey lighten-4"
            min-width="300"
            max-width="540"
            >
            <v-img
                :src="product.image_url"
                max-height="400"
            >
            </v-img>
            <v-card-text
                class="pt-6"
                style="position: relative;"
            >
                <v-btn
                absolute
                color="orange"
                class="white--text"
                fab
                large
                right
                top
                @click.prevent="addToCart(product.id)"
                >
                    <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
                <h3 class="display-1 font-weight-light orange--text mb-2">{{ product.name }}</h3>
                <div class="font-weight-light title mb-2">
                    Price: Rp. {{ product.price.toLocaleString() }}
                </div>
            </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  data () {
    return {
      model: null,
      snackbar: false,
      timeout: 3000
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
        .then(({ data }) => {
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
          this.$store.dispatch('getCartData')
        })
        .catch(err => {
          if (localStorage.user_token) {
            console.log()
            this.$store.commit('setMessage', err.response.data.msg)
            this.snackbar = true
          } else {
            this.$router.push('/login')
          }
        })
    }
  },
  created () {
    this.$store.dispatch('fetchShoes')
  }
}
</script>

<style>

</style>
