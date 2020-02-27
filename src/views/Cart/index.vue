<template>
  <v-card style="width:720px" class="container my-cart">
    <v-container style="width:700px">
      <v-alert v-if="success" type="success">{{success}}</v-alert>
      <h2 class="mb-3">My Cart</h2>
      <v-progress-circular
        :size="30"
        color="grey"
        indeterminate
        style="margin-left:50%;"
        v-if="loading&&!dialog&&!dialogDelete&&!dialogCheckout"
      ></v-progress-circular>
      <v-card class="mx-auto mb-2 mt-5" outlined v-for="cart in carts" :key="cart.id">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{cart.name}}</v-list-item-title>
            <h4 class="mb-2 mt-2">Quantity :</h4>
            <div class="mb-2">{{cart.quantity}}</div>
            <h4 class="mb-2">Price :</h4>
            <div class="mb-1">IDR {{cart.totalPrice.toLocaleString()}}</div>
          </v-list-item-content>
          <v-list-item-avatar tile size="80">
            <img :src="cart.image_url" alt="John" />
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn class="ml-2" @click.prevent="showDelete({...cart})" fab dark small color="error">
            <v-icon>fas fa-trash</v-icon>
          </v-btn>
          <v-btn class="ml-5 mx-2" @click.prevent="editPop({...cart})" fab dark small color="green">
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ml-auto my-checkout"
            @click.prevent="showCheckout({...cart})"
          >Proceed to payment</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-progress-circular
          :size="30"
          color="grey"
          indeterminate
          style="margin-left:50%; margin-top:15px;"
          v-if="loading"
        ></v-progress-circular>
        <v-alert type="error" class="container mb-1" max-width="800" v-if="error">{{error}}</v-alert>
        <v-card-title>
          <span class="headline">Edit quantity</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="editCart(cart)">
            <v-text-field v-model="cart.quantity" label="Quantity" required></v-text-field>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text type="submit">Save</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-progress-circular
          :size="30"
          color="grey"
          indeterminate
          style="margin-left:50%; margin-top:15px;"
          v-if="loading"
        ></v-progress-circular>
        <v-card-title>
          <span class="headline">Are You Sure ?</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="deleteCart(cart.id)">
            <v-btn color="blue darken-1" text @click="dialogDelete = false">cancel</v-btn>
            <v-btn color="blue darken-1" text type="submit">yes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCheckout" max-width="500px">
      <v-card>
        <v-progress-circular
          :size="30"
          color="grey"
          indeterminate
          style="margin-left:50%; margin-top:15px;"
          v-if="loading"
        ></v-progress-circular>
        <v-alert type="error" class="container mb-1" max-width="800" v-if="error">{{error}}</v-alert>
        <v-card-title>
          <span class="headline" v-if="!afterPay">Enter Payment</span>
          <span class="headline" v-if="afterPay">Transaction Detail</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="checkout(cart)" v-if="!afterPay">
            <v-text-field v-model="name" label="Name" required></v-text-field>
            <v-text-field type="number" v-model="creditCard" label="Credit Card Number" required></v-text-field>
            <v-btn color="blue darken-1" text @click="dialogCheckout = false">cancel</v-btn>
            <v-btn color="blue darken-1" text type="submit">yes</v-btn>
          </v-form>
          <v-container v-if="afterPay" align="center">
            <h3>Payment Order success</h3>
            <h4>invoice : {{name}} - {{new Date().getTime()}}</h4>
            <v-btn color="blue darken-1" text @click="dialogCheckout = false">Close</v-btn>
            <!-- <v-btn color="blue darken-1" text type="submit">yes</v-btn> -->
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
// import ModalDelete from './components/ModalDelete'
export default {

  components: {
    // ModalDelete
  },
  data: () => ({
    name: '',
    error: '',
    success: '',
    creditCard: '',
    afterPay: false,
    dialog: false,
    dialogDelete: false,
    dialogCheckout: false,
    cart: {}
  }),

  computed: {
    carts() {
      return this.$store.state.cart.filter(el => el.status === false)
    },
    loading() {
      return this.$store.state.loading
    }
  },

  created() {
    if (this.$store.state.cart.length === 0) {
      this.$store.dispatch('fetchCart')
    }
    this.success = ''
  },

  methods: {
    showDelete(cart) {
      this.cart = cart
      this.dialogDelete = true
    },
    deleteCart(id) {
      this.$store.commit('enLoading', true)
      this.$store.dispatch('deleteCart', id)
        .then(({ data }) => {
          this.$store.dispatch('fetchCart')
          this.$store.commit('enLoading', false)
          this.success = data.msg
          this.dialogDelete = false
        })
        .catch(err => {
          if (err.response.data.error) {
            this.error = err.response.data.error
          } else if (err.response.data.errors) {
            this.error = err.response.data.errors[0]
          }
          this.$store.commit('enLoading', false)

        })
    },
    editPop(cart) {
      this.error = ''
      this.cart = cart
      this.dialog = true
    },
    editCart(cart) {
      this.$store.commit('enLoading', true)
      let data = {
        id: cart.id,
        quantity: cart.quantity
      }
      this.$store.dispatch('updateCart', data)
        .then((result) => {
          this.$store.dispatch('fetchCart')
          this.dialog = false
          this.success = result.data.msg
        })
        .catch(err => {
          if (err.response.data.error) {
            this.error = err.response.data.error
          } else if (err.response.data.errors) {
            this.error = err.response.data.errors[0]
          }
          this.$store.commit('enLoading', false)
        })
    },
    showCheckout(cart) {
      this.error = ''
      this.name = ''
      this.creditCard = ''
      this.afterPay = false
      this.cart = cart
      this.dialogCheckout = true
    },
    checkout(cart) {
      this.$store.commit('enLoading', true)
      let data = {
        ProductId: cart.ProductId,
        quantity: cart.quantity,
        id: cart.id
      }
      this.$store.dispatch('checkoutCart', data)
        .then(() => {
          this.$store.dispatch('fetchCart')
          this.afterPay = true
        })
        .catch(err => {
          if (err.response.data.error) {
            this.error = err.response.data.error
          } else if (err.response.data.errors) {
            this.error = err.response.data.errors[0]
          }
          this.$store.commit('enLoading', false)
        })
    }
  }
}
</script>

<style>
.my-checkout {
  background-color: #fec442 !important;
}
</style>
