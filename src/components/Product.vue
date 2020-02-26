<template>
  <fragment>
    <CircularLoading v-if="isLoading && !product"/>
    <div class="card-wrapper">
      <article class="card mb-2">
        <div class="card-body">
          <router-link class="router-link" :to="`/products/${product.id}/details`">
            <img
              class="d-block img-fluid w-100"
              :src="product.ProductImages[0].url"
              :alt="product.name"
            >
            <h4 class="card-title">
              {{ product.name }}
            </h4>
            <p class="card-text">{{ product.price | formatCurrency }}</p>
          </router-link>
          <b-button v-if="isHomePage" href="#" variant="primary">Buy now</b-button>
          <b-button v-if="!isHomePage" @click="addToCart(product, 1)" class="btn-add-to-cart" variant="primary">Add to cart</b-button>
          <!-- <b-button v-if="!isHomePage" variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </b-button> -->
        </div>
      </article>
    </div>
  </fragment>
</template>

<script>
import CircularLoading from '../components/CircularLoading'
import { Fragment } from 'vue-fragment'
export default {
  name: 'Product',
  components: {
    CircularLoading,
    Fragment
  },
  props: {
    product: Object,
    isHomePage: Boolean
  },
  methods: {
    addToCart (product, quantity) {
      const cart = this.$store.state.user.cart
      if (!cart.length) {
        this.$store.dispatch('addToCart', {
          product_id: product.id,
          quantity
        })
          .then(response => {
            this.$store.dispatch('findUser')
              .then(response => {
                this.$bvToast.toast('Product ' + product.name + ' has been added', {
                  title: 'Successfully added',
                  variant: 'success',
                  solid: true
                })
                this.$store.commit('SET_USER', response.data)
                this.$store.commit('SET_LOADING_ADD_TO_CART', false)
              })
              .catch(err => {
                this.$store.commit('SET_ERRORS', err.response)
                this.$store.commit('SET_LOADING_ADD_TO_CART', false)
              })
          })
          .catch(err => {
            this.$store.commit('SET_ERRORS', err.response)
            this.$store.commit('SET_LOADING_ADD_TO_CART', false)
          })
      } else {
        const cart = this.$store.state.user.cart
        this.$store.dispatch('updateCart', {
          cart_id: cart[0].id,
          product_id: product.id,
          quantity
        })
          .then(response => {
            this.$bvToast.toast('Product ' + product.name + ' has been added', {
              title: 'Successfully added',
              variant: 'success',
              solid: true
            })
            this.$store.commit('SET_LOADING_ADD_TO_CART', false)
          })
          .catch(err => {
            this.$store.commit('SET_ERRORS', err.response)
            this.$store.commit('SET_LOADING_ADD_TO_CART', false)
          })
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isLoadingAddToCart () {
      return this.$store.state.isLoadingAddToCart
    }
  },
  filters: {
    formatCurrency (value) {
      const price = new Intl.NumberFormat('id-ID').format(value)
      return 'Rp ' + price
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-add-to-cart {
    margin-top: 20px;
  }
  .card {
    border: none;
    &-wrapper {
      flex: 1 1 auto;
      min-height: 1px;
    }
    &-body {
      text-align: center;
    }
    &-text {
      color: #212529 !important;
      margin-bottom: 20px !important;
    }
  }

  .router-link {
    width: 100%;
    display: inline-block;
    &:hover {
      text-decoration: none;
      h4 {
        color: #007bff
      }
      p {
        font-weight: 600;
      }
    }
  }
</style>
