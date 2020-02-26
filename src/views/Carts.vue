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
            <CartDetail v-for="cart in getCart" :key="cart.id" :cart="cart" @showDeleteModal="showDeleteModal"/>
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
                  @click.prevent="checkout">
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
      // console.log('masuk sini')
      this.$store.dispatch('fetchCart')
        .then(({ data }) => {
          // console.log(data)
          this.$store.commit('SET_CART', data.data)
          data.data.forEach(product => {
            this.total += product.total
          })
          // console.log(this.getCart)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    showDeleteModal (status) {
      console.log('testing')
      this.showDelete = status
    },
    checkout () {

    }
  },
  computed: {
    getCart () {
      return this.$store.state.carts
    },
    getTotalPrice () {
      return 'Rp ' + (+this.total).toLocaleString('id-ID')
    }
  },
  created () {
    this.fetchCart()
    console.log('testing')
  }
}
</script>
