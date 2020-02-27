<template>
  <div class="home container">
    <!-- <div class="my-2 d-flex justify-end">
      <v-btn @click="toDetailProduct" color="primary" dark>
        <v-icon left>mdi-plus-thick</v-icon>Detail Produk
      </v-btn>
    </div> -->
    <v-card>
      <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false"></loading>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="product in products"
            :key="product.id"
            :cols="3"
          >
            <v-card class="pointer">
              <v-img
                :src="product.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              ></v-img>
              <v-card-title v-text="product.name"></v-card-title>
              <v-card-text>
                Rp {{ product.price.toLocaleString('id') }} <br>
                Stock: {{ product.stock }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div @click="addCart(product.id)">
                  <span>Add to Cart</span>
                  <v-btn icon>
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  methods: {
    toDetailProduct () {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      setTimeout(() => {
        loader.hide()
        this.$router.push('/detailProduct')
      }, 1000)
    },
    addCart (id) {
      console.log(id)
      this.$store.dispatch('addCart', {
        TransactionId: this.currentUser.Transactions[0].id,
        ProductId: id,
        quantity: 1
      })
        .then(({ data }) => {
          console.log(data)
          this.fetchCart()
          this.$notify({
            group: 'sign',
            title: 'Add cart',
            text: data.msg,
            type: 'success'
          })
        })
        .catch(err => {
          if (err.response) console.log(err.response)
          else console.log(err)
        })
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    products () {
      return this.$store.state.products
    },
    currentUser () {
      return this.$store.state.currentUser
    },
    headers () {
      const headers = []
      Object.keys(this.products[0]).forEach(product => {
        headers.push({
          text: (product.toLowerCase().split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1)))),
          value: product
        })
      })
      return headers
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.fetchCart()
  }
}
</script>
