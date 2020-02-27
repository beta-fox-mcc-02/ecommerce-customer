<template>
  <v-container
    fluid
    style="margin-top: 127px;"
  >
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ message }}
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Fetching your cart...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-toolbar flat>
        <v-card-title>
            Cart
        </v-card-title>
    </v-toolbar>
    <div v-if="!cart.length">
        <v-card flat>
            <v-card-title class="title align-center">
                Empty Cart
            </v-card-title>
            <v-card-text>
                Add one or more from shoes menu and click 'Add To Cart' or cart symbol to add items to your cart
            </v-card-text>
        </v-card>
    </div>
    <div v-else>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">No</th>
                        <th class="text-left">Image</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Subtotal</th>
                        <th class="text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in cart" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td><v-img :src="item.Product.image_url" height="60" width="60"></v-img></td>
                        <td>{{ item.Product.name }}</td>
                        <td>
                            <v-toolbar flat style="display: flex; justify-content: space-between">
                                <v-btn type="button" icon @click.prevent="decreaseQuantity(item.id)" :disabled="item.quantity === 1 ? true : false">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                {{ item.quantity }}
                                <v-btn type="button" icon @click.prevent="increaseQuantity(item.id)" :disabled="item.quantity > item.Product.stock ? true : false">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-toolbar>
                        </td>
                        <td>Rp. {{ (item.Product.price * item.quantity).toLocaleString() }}</td>
                        <td><v-btn icon @click.prevent="deleteOneItem(item.id)"><v-icon>delete</v-icon></v-btn></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-toolbar flat>
            <v-card-title>
        Total:
            </v-card-title>
        <v-spacer></v-spacer>
            <v-card-title>
                Rp. {{ total.toLocaleString() }}
            </v-card-title>
        <v-divider
            inset
            vertical
        ></v-divider>
        <v-btn
            type="button"
            dark
            color="warning"
            class="black--text"
            @click.prevent="checkout"
        >
            Checkout
        </v-btn>
        <v-divider
            inset
            vertical
        ></v-divider>
        <v-btn
            type="button"
            dark
            color="red"
            class="white--text"
            @click.prevent="deleteAllItems"
        >
            Clear Cart
        </v-btn>
        </v-toolbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      snackbar: false,
      timeout: 3000,
      dialog: false
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    total () {
      let total = 0
      this.$store.state.cart.forEach(el => {
        total += (el.Product.price * el.quantity)
      })
      return total
    },
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    increaseQuantity (id) {
      this.dialog = true
      this.$store.dispatch('changeQuantity', {
        id: id,
        value: 1
      })
        .then(({ data }) => {
          this.$store.dispatch('getCartData')
          this.dialog = false
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
        })
        .catch(err => {
          this.dialog = false
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
        })
    },
    decreaseQuantity (id) {
      this.dialog = true
      this.$store.dispatch('changeQuantity', {
        id: id,
        value: -1
      })
        .then(({ data }) => {
          this.$store.dispatch('getCartData')
          this.dialog = false
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
        })
        .catch(err => {
          this.dialog = false
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
        })
    },
    deleteOneItem (id) {
      this.dialog = true
      this.$store.dispatch('deleteOneItem', id)
        .then(({ data }) => {
          this.$store.dispatch('getCartData')
          this.dialog = false
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
        })
        .catch(err => {
          this.dialog = false
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
        })
    },
    deleteAllItems () {
      this.dialog = true
      this.$store.dispatch('deleteAllItems')
        .then(({ data }) => {
          this.$store.dispatch('getCartData')
          this.dialog = false
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
        })
        .catch(err => {
          this.dialog = false
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
        })
    },
    checkout () {
      this.dialog = true
      this.$store.dispatch('checkout')
        .then(({ data }) => {
          this.$store.dispatch('getCartData')
          this.dialog = false
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
        })
        .catch(err => {
          this.dialog = false
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
        })
    }
  },
  created () {
    document.title = 'Cart - Foot-Style'
    this.$store.dispatch('getCartData')
  }
}
</script>

<style>

</style>
