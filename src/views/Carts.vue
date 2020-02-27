<template>
  <v-row align-start>
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
            <CartDetail v-for="cart in getCart" :key="cart.id" :cart="cart" @showDeleteModal="showDeleteModal" @fetchCart="fetchCart"/>
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

export default {
  data () {
    return {
      total: null,
      showDelete: false
    }
  },
  components: {
    CartDetail,
    ModalDelete
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
          console.log(err.response)
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
          console.log(data)
          this.$store.dispatch('fetchCart')
            .then(cart => {
              this.$store.commit('SET_CART', data.data)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err.response, '======')
        })
    }
  },
  watch: {
    getCartStatus (val) {
      console.log(val)
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
      // return this.$store.state.cartStatus
      // const a = this.$store.state.cartStatus
      // console.log(a)
      // for (const b in a) {
      //   console.log(a[b])
      // }
      // console.log(this.$store.state.cartStatus)
      let status = false
      for (const val in this.$store.state.cartStatus) {
        // console.log(val)
        if (this.$store.state.cartStatus[val] === false) {
          status = true
        } else {
          status = false
        }
      }
      console.log(status)
      return status
    }
  },
  created () {
    this.fetchCart()
    // console.log('testing')
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
