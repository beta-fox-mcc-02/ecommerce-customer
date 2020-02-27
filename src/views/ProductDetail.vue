<template>
  <div>
    <b-container>
      <div class="product" v-if="product">
        <div class="product-image" v-if="product.ProductImages">
          <img :src="product.ProductImages[0].url" class="img-fluid w-100 d-block" />
        </div>
        <div class="product-info">
          <div class="product-detail">
            <h3>Detail</h3>
            <table class="table">
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{{ product.name }}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>:</td>
                <td>{{ product.price | formatCurrency }}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>:</td>
                <td>{{ product.weight }} kg</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>:</td>
                <td>{{ product.description }}</td>
              </tr>
              <tr>
                <td>Quantity</td>
                <td>:</td>
                <td>
                  <input type="number" v-model="quantity" class="form-control"/>
                </td>
              </tr>
            </table>
             <b-button @click="addToCart(product, quantity)"
              class="btn-add-to-cart" variant="primary">Add to cart</b-button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data: () => {
    return {
      quantity: 1
    }
  },
  methods: {
    addToCart (product, quantity) {
      quantity = +quantity
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
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('fetchProductDetail', { product_id: +id })
      .then(response => {
        this.$store.commit('SET_PRODUCT', response.data.product)
        this.$store.commit('SET_LOADING_PRODUCT', false)
      })
      .catch(err => {
        this.$store.commit('SET_LOADING_PRODUCT', false)
        this.$store.commit('SET_ERRORS', err.response)
      })
  },
  computed: {
    product () {
      return this.$store.state.product
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
  .product {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .product-image {
      min-width: 250px;
    }
    .product-info {
      margin-left: 20px;
    }
  }
</style>
