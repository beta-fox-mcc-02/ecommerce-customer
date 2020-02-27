<template>
  <v-row align-start>
    <Alert v-if="getMessage" />
    <v-col v-if="!showDelete">
      <v-simple-table>
          <thead>
            <tr>
              <th class="text-center">Image</th>
              <th class="text-center">Product</th>
              <th class="text-center">Stock</th>
              <th class="text-center">Price</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Action</th>
              <th class="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            <CartDetail v-for="cart in getCart" :key="cart.id" :cart="cart" @showDeleteModal="showDeleteModal" @fetchCart="fetchCart" @setTotal="setTotal"/>
            <!-- {{ getCart }} -->
            <tr>
              <td colspan="6"></td>
              <td class="text-center">{{ getTotalPrice }}</td>
            </tr>
            <tr>
              <td colspan="6"></td>
              <td class="text-center">
                <v-btn
                  color="success"
                  @click.prevent="checkout"
                  :disabled="getCartStatus">
                  Checkout
                </v-btn>
              </td>
            </tr>
          </tbody>
      </v-simple-table>
    </v-col>
    <v-col v-else>
      <ModalDelete />
    </v-col>
  </v-row>
</template>

<script>
import CartDetail from '@/components/CartDetail.vue'
import ModalDelete from '@/components/ModalDelete.vue'
import Alert from '@/components/Alert.vue'

export default {
  data () {
    return {
      total: null,
      showDelete: false
    }
  },
  components: {
    CartDetail,
    ModalDelete,
    Alert
  },
  methods: {
    fetchCart () {
      this.total = 0
      // console.log('masuk sini')
      this.$store.dispatch('fetchCart')
        .then(({ data }) => {
          // console.log(data, '====')
          this.$store.commit('SET_CART', data.data)
          if (data.data.length !== 0) {
            data.data.forEach(product => {
              // console.log(product, '====')
              this.total += product.total
            })
          }
        })
        .catch(err => {
          // console.log(err.response)
          this.$store.commit('SET_MESSAGE', { msg: err.response.data.msg, status: false })
        })
    },
    showDeleteModal (status) {
      // console.log('testing')
      this.showDelete = status
    },
    checkout () {
      let payload
      this.getCart.forEach(el => {
        if (!payload) {
          payload = {
            CartId: el.CartId,
            id: [el.id],
            ProductId: [el.ProductId]
          }
        } else {
          payload.id.push(el.id)
          payload.ProductId.push(el.ProductId)
        }
      })
      this.$store.dispatch('checkout', payload)
        .then(({ data }) => {
          // console.log(data)
          this.$store.commit('SET_MESSAGE', { msg: 'success checkout', status: true })
          this.$store.dispatch('fetchCart')
            .then(cart => {
              this.$store.commit('SET_CART', data.data)
              this.$router.push('/products')
            })
            .catch(err => {
              // console.log(err)
              this.$store.commit('SET_MESSAGE', { msg: err.response.data.msg, status: false })
            })
        })
        .catch(err => {
          // console.log(err.response, '======')
          this.$store.commit('SET_MESSAGE', { msg: err.response.data.msg, status: false })
        })
    },
    setTotal (total) {
      this.total = total
    }
  },
  watch: {
    getCartStatus (val) {
      // console.log(val)
      // if (!this.getCart) {
      //   return true
      // } else {
      //   return false
      // }
      // this.status = this.$store.state.cartStatus
    }
  },
  computed: {
    getCart () {
      return this.$store.state.carts
    },
    getTotalPrice () {
      return 'Rp ' + (+this.total).toLocaleString('id-ID')
    },
    getCartStatus () {
      // let status = false
      // for (const val in this.$store.state.cartStatus) {
      //   // console.log(val)
      //   if (this.$store.state.cartStatus[val] === false) {
      //     status = true
      //   } else {
      //     status = false
      //   }
      // }
      if (this.$store.state.carts.length !== 0) {
        return false
      } else {
        return true
      }
      // console.log(status)
      // return status
    },
    getMessage () {
      return this.$store.state.message
    }
  },
  created () {
    this.fetchCart()
  },
  beforeRouteEnter (from, to, next) {
    if (localStorage.access_token) {
      next()
    } else {
      next('/users/login')
    }
  }
}
</script>
