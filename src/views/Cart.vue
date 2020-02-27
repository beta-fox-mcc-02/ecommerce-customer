<template>
  <fragment>
    <PageLoading  v-if="isLoadingCart" />
    <div class="cart" v-if="!isLoadingCart && cart">
      <b-container>
      <h2>Cart</h2>
      <b-alert v-if="errors.length" show variant="danger">
        <div style="margin-bottom:10px;" v-for="(err, index) of errors" :key="index">
          {{ err }}
        </div>
      </b-alert>
      <table class="table">
        <th>No</th>
        <th>Name</th>
        <th>Image</th>
        <th>Quantity</th>
        <th class="text-right">Price</th>
        <th class="text-right">Subtotal</th>
        <th class="text-right">Actions</th>
        <tbody v-if="cart">
          <tr v-for="(product, index) in cart.CartDetails" :key="product.id">
            <td> {{ index + 1 }} </td>
            <td>  {{ product.Product.name }} </td>
            <td>
              <div class="image-product">
                <span class="image-cart" v-if="product.Product.ProductImages">
                  <b-img fluid :src="product.Product.ProductImages[0].url" :alt="product.Product.name"></b-img>
                </span>
              </div>
            </td>
            <td>
              <input min="1" step="1" type="number" class="form-control text-center" v-model="product.quantity">
            </td>
            <td class="text-right">{{ product.price | formatCurrency }}</td>
            <td class="text-right">{{ product.total | formatCurrency }}</td>
            <td class="text-right">
              <a @click="openModalDelete(product.id)" class="delete-cart">
                <i class="color-red fa fa-trash"></i>
              </a>
            </td>
          </tr>
          <tr v-if="!cart.CartDetails">
            <td colspan="6">You don't purchase any items</td>
          </tr>
          <tr v-if="cart.CartDetails">
            <td colspan="4"></td>
            <td class="text-right">Total</td>
            <td class="text-right">{{ total | formatCurrency }}</td>
            <td></td>
          </tr>
          <tr class="tr-actions" v-if="cart.CartDetails">
            <td colspan="2">
              <router-link to="/products">
                <b-button variant="outline-info">Continue shopping</b-button>
              </router-link>
            </td>
            <td colspan="3"></td>
            <td class="btn-update text-right">
              <b-button @click="updateCart" variant="outline-primary">Update cart</b-button>
            </td>
            <td class="btn-checkout text-right">
              <b-button @click="checkout" variant="outline-success">Checkout</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      </b-container>
    </div>
  <DeleteModal :id="deletedId" :cart="cart.id" @closeModal="closeModal" :show="show" />
  </fragment>
</template>

<script>
import DeleteModal from '@/components/DeleteModal.vue'
import { Fragment } from 'vue-fragment'
import PageLoading from '@/components/PageLoading.vue'
export default {
  name: 'Cart',
  components: {
    DeleteModal,
    Fragment,
    PageLoading
  },
  data () {
    return {
      // cart: {},
      show: false,
      deletedId: 0
    }
  },
  methods: {

    closeModal (payload) {
      this.show = payload
    },
    checkout () {
      this.$store.dispatch('checkout', {
        cart_id: this.cart.id,
        cart_details: this.cart.CartDetails
      })
        .then(response => {
          this.$store.dispatch('findUser')
            .then(response => {
              this.$store.commit('SET_USER', response.data)
              this.$store.commit('SET_CART', response.data.cart)
              this.$store.commit('SET_LOADING_CART', false)
              this.$store.commit('SET_ERRORS', [])
              this.$router.push('/')
            })
            .catch(err => {
              this.$store.commit('SET_LOADING_CART', false)
              this.$store.commit('SET_ERRORS', err.data)
            })
        })
        .catch(err => {
          this.$store.commit('SET_ERRORS', err.response.data.errors)
          this.$store.commit('SET_LOADING_CART', false)
        })
    },
    openModalDelete (id) {
      this.show = true
      this.deletedId = id
    },
    updateCart () {
      this.$store.dispatch('updateCartDetail', {
        cart_id: this.cart.id,
        cart_details: this.cart.CartDetails
      })
        .then(response => {
          this.$store.dispatch('fetchCarts', { cart_id: this.cart.id })
            .then(response => {
              this.$store.commit('SET_CART', response.data)
              this.$store.commit('SET_LOADING_CART', false)
            })
            .catch(err => {
              this.$store.commit('SET_ERRORS', err.response)
              this.$store.commit('SET_LOADING_CART', false)
            })
        })
        .catch(err => {
          this.$store.dispatch('fetchCarts', { cart_id: this.cart.id })
            .then(response => {
              this.$store.commit('SET_CART', response.data)
              this.$store.commit('SET_LOADING_CART', false)
            })
            .catch(err => {
              this.$store.commit('SET_ERRORS', err.response)
              this.$store.commit('SET_LOADING_CART', false)
            })
          this.$store.commit('SET_ERRORS', err.response.data.errors)
        })
    }
  },
  created () {
    if (this.user.cart && this.user.cart.length) {
      this.$store.dispatch('fetchCarts', { cart_id: this.user.cart[0].id })
        .then(response => {
          // this.cart = response.data
          this.$store.commit('SET_CART', response.data)
          this.$store.commit('SET_LOADING_CART', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERRORS', err.response.data.errors)
          this.$store.commit('SET_LOADING_CART', false)
        })
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    user () {
      return this.$store.state.user
    },
    total () {
      return this.$store.getters.total
    },
    isLoadingCart () {
      return this.$store.state.isLoadingCart
    },
    errors () {
      return this.$store.state.errors
    }
  },
  filters: {
    formatCurrency (value) {
      const price = new Intl.NumberFormat('id-ID').format(value)
      return 'Rp ' + price
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('checkAuthenticated')
        .then(response => {
          vm.$store.commit('SET_AUTHENTICATED', true)
          vm.$store.commit('SET_LOADING_AUTHENTICATION', false)
          vm.$store.commit('SET_USER', response.data)
          next()
        })
        .catch((err) => {
          vm.$store.commit('SET_AUTHENTICATED', false)
          vm.$store.commit('SET_LOADING_AUTHENTICATION', false)
          vm.$store.commit('SET_USER', {})
          vm.$store.commit('SET_ERRORS', err.response)
          vm.$router.push('/login')
        })
    })
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    padding-top: 20px;
  }
  .delete-cart {
    cursor: pointer
  }
  .color-red {
    color: #dc3545;
  }
  .image-cart {
    display: inline-block;
    max-width: 100px;
  }
  .image-product {
    display: flex;
  }
</style>
