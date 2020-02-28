<template>
  <div class="about container">
    <v-card>
      <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false">
      </loading>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Image Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="product in cartProducts" :key="product.id">
            <cart :product="product"/>
          </tbody>
          <tfoot>
            <td style="text-align: right">Total :</td>
            <td style="text-align: left">Rp {{ totalPrice.toLocaleString('id') }}</td>
            <td></td>
            <td></td>
            <td>
              <!-- <v-btn @click="checkout" small color="primary" class="ml-2">checkout</v-btn> -->
              <!-- <prompt-confirm @action="continueAction" :message="message"/> -->
              <v-btn color="primary" small dark @click.stop="dialog = true">
                checkout
              </v-btn>
            </td>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Are You sure?</v-card-title>

          <v-card-text>
            {{ message }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="continueAction"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import cart from '../components/cartList'
export default {
  name: 'Checkout',
  data () {
    return {
      message: 'Are You sure you want to checkout ?',
      dialog: false
    }
  },
  components: {
    cart
  },
  methods: {
    continueAction () {
      this.dialog = false
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      this.$store.dispatch('checkout')
        .then(({ data }) => {
          loader.hide()
          console.log(data)
          this.$notify({
            group: 'sign',
            title: 'Checkout',
            text: data.msg,
            type: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          loader.hide()
          if (err.response) {
            console.log('Error in checkout:', err.response)
            this.$notify({
              group: 'sign',
              title: 'Checkout',
              text: err.response.msg || 'Ada eror deh pokoknya',
              type: 'error'
            })
          }
        })
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    cartProducts () {
      return this.currentUser.Transactions[0].Products
    },
    totalPrice () {
      return this.cartProducts.reduce(function (a, b) {
        return a + (b.price * b.ProductTransaction.quantity)
      }, 0)
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>
