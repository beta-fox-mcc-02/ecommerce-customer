<template>
  <v-container fluid>
    <v-card class="my-poster mx-auto mb-10" elevation="24" max-height="444">
      <MyCarosel class="my-poster"></MyCarosel>
    </v-card>
    <h2 class="mb-3" id="my-title">Products</h2>
    <v-progress-circular
      :size="50"
      color="amber"
      indeterminate
      style="margin-left:50%;"
      v-if="loading"
    ></v-progress-circular>
    <v-alert v-if="success" type="success">
      {{success}}
      <router-link to="/cart">cart</router-link>
    </v-alert>
    <v-row>
      <v-col cols="3" sm="6" md="4" v-for="product in products" :key="product.id">
        <v-hover v-slot:default="{ hover }" close-delay="200">
          <v-card class="mx-auto" max-width="344" :elevation="hover ? 16 : 2">
            <v-img :src="product.image_url" width="200px" style="margin-left:20%"></v-img>
            <v-card-title>{{product.name}}</v-card-title>
            <v-card-subtitle>IDR {{product.price.toLocaleString()}}</v-card-subtitle>
            <v-card-actions>
              <v-card-text class="text--primary">Stock : {{product.stock}}</v-card-text>
              <v-btn class="ml-auto btn-cart" @click.prevent="addToCart(product.id)">
                add to cart
                <v-icon>fas fa-shopping-cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MyCarosel from './components/MyCarosel'
export default {
  name: 'Products',
  data() {
    return {
      success: '',
      error: ''
    }
  },
  components: {
    MyCarosel
  },
  methods: {
    addToCart(ProductId) {
      if (localStorage.token) {
        this.$store.commit('enLoading', true)
        let newCart = this.cart.filter(el => { return ((el.ProductId === ProductId) && (el.status === false)) })
        let data = { ProductId }
        if (newCart.length === 0) {
          this.$store.dispatch('addToCart', data)
            .then(() => {
              this.$store.dispatch('fetchCart')
              this.$store.commit('enLoading', true)
              this.success = `success insert into`
            })
            .catch(err => {
              if (err.response.data.error) {
                this.error = err.response.data.error
              } else if (err.response.data.errors) {
                this.error = err.response.data.errors[0]
              }
              this.$store.commit('enLoading', true)
            })
        } else {
          data.id = newCart[0].id
          data.quantity = newCart[0].quantity + 1
          this.$store.dispatch('updateCart', data)
            .then(() => {
              this.dialog = false
              this.$store.dispatch('fetchCart')
              this.$store.commit('enLoading', true)
              this.success = `success insert into`
            })
            .catch(err => {
              if (err.response.data.error) {
                this.error = err.response.data.error
              } else if (err.response.data.errors) {
                this.error = err.response.data.errors[0]
              }
              this.$store.commit('enLoading', true)
            })
        }
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    cart() {
      return this.$store.state.cart
    },
    loading() {
      return this.$store.state.loading
    }
  },
  created() {
    if (this.$store.state.products.length === 0) {
      this.$store.dispatch('fetchProduct')
    }
    this.success = ''
  }
}
</script>

<style>
.btn-cart {
  background-color: #7f7f7f !important;
  color: #fec442 !important;
}
#my-title {
  color: #7f7f7f !important;
}

.my-poster {
  height: 50vh;
  background-color: none;
}
</style>
