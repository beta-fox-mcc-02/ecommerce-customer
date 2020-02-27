<template>
  <v-card class="d-inline-block mx-auto"
    width="300"
    style="margin-bottom: 100px; box-shadow: 1px 1px 5px 8px rgba(0,0,0,0.15);"
  >
    <v-container>
        <v-card-text class="text-center">
          <b>{{ product.name }}</b>
        </v-card-text>
        <v-col cols="auto">
          <v-img
            height="200"
            width="200"
            :src="image"
            shaped
          ></v-img>
        </v-col>
        <v-col
          cols="auto"
          class="text-center pl-0"
          style="margin-bottom: -50px"
        >
          <v-row
            height="100"
            class="flex-row ma-0 fill-height"
            justify="center"
            style="display:flex; align-items:center;"
          >
            <v-col class="px-0">
              <v-btn @click.prevent="substract" icon>
                <v-icon>mdi-minus-circle</v-icon>
              </v-btn>
            </v-col>
            <v-col class="px-0">
              <v-row>
                <v-col>
                  <v-text-field
                  class="text-center"
                  label="Qty"
                  name="qty"
                  type="number"
                  min="0" step="1"
                  v-model.lazy="qty">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="px-0">
              <v-btn @click.prevent="add" icon>
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-text-field
                class="text-center"
                label="Stock"
                name="qty"
                type="number"
                readonly
                v-model="product.stock">
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <!-- <Alert v-if="alertMessage"/> -->
          <v-row>
            <v-col>
              <v-card-text style="display:flex; align-items:center; justify-content: space-between">
                <div>
                  {{ getProductPrice }}
                </div>
                <v-btn @click.prevent="addToCart" :disabled="getDisableState" icon color="primary">
                  <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
    </v-container>
  </v-card>
</template>

<script>
// import Alert from '@/components/Alert/vue'
export default {
  data () {
    return {
      image: this.product.image_url,
      qty: 1
    }
  },
  props: ['product'],
  methods: {
    add () {
      this.qty++
    },
    substract () {
      this.qty--
    },
    resetQty () {
      this.qty = 0
    },
    addToCart () {
      if (!localStorage.access_token) {
        this.$store.commit('SET_MESSAGE', { msg: 'Please log in first', status: false })
        this.$router.push('/users/login')
      }
      const payload = {
        productId: this.product.id,
        price: this.product.price,
        stock: this.product.stock,
        qty: this.qty
      }
      this.$store.dispatch('addToCart', payload)
        .then(({ data }) => {
          this.$store.dispatch('fetchCart')
            .then(({ cart }) => {
              this.qty = 0
              this.$router.push('/carts')
            })
            .catch(err => {
              console.log(err.response)
            })
          // console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  watch: {
    qty: function (val) {
      // console.log(val)
      if (val === 0) {
        this.qty = 1
      } else if (val < 1) {
        this.qty = Math.abs(val)
      }
      if (this.product.stock === 0) {
        this.qty = 0
      }
      if (val > this.product.stock) {
        this.qty = this.product.stock
      }
    }
  },
  computed: {
    getProductPrice () {
      return 'Rp ' + (+this.product.price).toLocaleString('id-ID')
    },
    alertMessage () {
      return this.$store.state.message
    },
    getDisableState () {
      if (this.product.stock === 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    // console.log(this.product)
  }
}
</script>
