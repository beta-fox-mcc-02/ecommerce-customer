<template>
  <div class="container border rounded mt-3 cart-container">
    <div class="lets-shop-container" v-if="!carts.length">
      <p class="shop-text">Let's Shop</p>
      <i class="fa fa-shopping-cart shop-icon" aria-hidden="true" @click="toHome"></i>
    </div>
    <div class="cart-list-container" v-if="carts.length">
      <div class="alert alert-danger alert-style" role="alert" v-if="editCartError">
        {{ message }}
      </div>
      <loading v-if="loading"/>
      <table class="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.id">
            <td><img :src="cart.Product.image_url" class="product-img"></td>
            <td>{{ cart.Product.name }}</td>
            <td>Rp {{ cart.Product.price.toLocaleString('id-ID') }}.00</td>
            <td>
              <p class="m-0" v-if="!editQuantity || cartId !== cart.id">
                {{ cart.quantity }}
              </p>
              <div class="edit-quantity d-flex" v-if="editQuantity && cartId === cart.id">
                <form @submit.prevent="editQuantityOnly(cart.id, cart.Product.id)">
                  <input type="number" min="1" v-model="quantity">
                  <button type="submit" class="mt-2 btn btn-secondary btn-edit-quantity">Submit</button>
                </form>
                <i class="fa fa-times btn" @click="editQuantityInput"></i>
              </div>
            </td>
            <td>Rp {{ cart.price.toLocaleString('id-ID') }}.00</td>
            <td>
              <button class="btn btn-secondary mr" v-if="!cart.status" @click="editQuantityInput(cart.quantity, cart.id)">Edit quantity</button>
              <button class="btn btn-dark mx-2" v-if="!cart.status" @click="purchase(cart.id, cart.Product.id, cart.quantity)">Purchase</button>
              <button class="btn btn-info" v-if="cart.status && cartId !== cart.id" @mouseover="toDeleteShow(cart.id)" >Purchased</button>
              <button class="btn btn-danger" v-if="toDelete && cartId === cart.id" @mouseleave="toDeleteShow" @click="deleteCart(cart.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'

export default {
  name: 'Cart',
  components: {
    Loading
  },
  data () {
    return {
      editQuantity: false,
      quantity: null,
      cartId: null,
      toDelete: false,
      message: '',
      editCartError: false
    }
  },
  methods: {
    toDeleteShow (cartID) {
      if (this.toDelete) {
        this.toDelete = false
        this.cartId = null
      } else {
        this.cartId = cartID
        this.toDelete = true
      }
    },
    toHome () {
      this.$router.push({ name: 'Home' })
      this.$store.commit('SET_CURRENT_PAGE', 'Home')
    },
    fetchCarts () {
      return this.$store.dispatch('fetchCarts')
        .then(({ data }) => {
          this.$store.commit('SET_CARTS', data)
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
        .catch(({ response }) => {
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
    },
    editQuantityInput (quantity, cartId) {
      if (this.editQuantity) {
        this.editQuantity = false
        this.quantity = null
        this.cartId = null
      } else {
        this.editQuantity = true
        this.quantity = quantity
        this.cartId = cartId
      }
    },
    editQuantityOnly (cartId, productId) {
      this.$store.commit('SET_CART_ID', cartId)
      this.$store.commit('SET_QUANTITY_UPDATED', this.quantity)
      this.$store.commit('SET_PRODUCT_ID', productId)
      this.$store.commit('SET_CURRENT_USERID', Number(localStorage.getItem('userId')))
      return this.$store.dispatch('editCartQuantity')
        .then(({ data }) => {
          this.editQuantityInput()
          return this.$store.dispatch('fetchCarts')
        })
        .then(({ data }) => {
          this.$store.commit('SET_CARTS', data)
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
          this.editCartError = false
        })
        .catch(({ response }) => {
          this.message = response.data.msg
          this.editCartError = true
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
    },
    purchase (cartId, productId, quantity) {
      let stockAvailable

      this.$store.commit('SET_PRODUCT_ID', productId)
      return this.$store.dispatch('findOneProduct')
        .then(({ data }) => {
          if (data.data.stock >= quantity) {
            stockAvailable = data.data.stock - quantity
            this.$store.commit('SET_STOCK_AVAILABLE', stockAvailable)
            this.$store.commit('SET_CART_ID', cartId)
            return this.$store.dispatch('purchase')
          } else {
            this.message = 'stocks does not available'
          }
        })
        .then(({ data }) => {
          return this.$store.dispatch('editProductStock')
        })
        .then(({ data }) => {
          return this.$store.dispatch('fetchCarts')
        })
        .then(({ data }) => {
          this.$store.commit('SET_CARTS', data)
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
        .catch(({ response }) => {
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
    },
    deleteCart (cartId) {
      this.$store.commit('SET_CART_ID', cartId)
      return this.$store.dispatch('deleteCart')
        .then(({ data }) => {
          return this.$store.dispatch('fetchCarts')
        })
        .then(({ data }) => {
          this.$store.commit('SET_CARTS', data)
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
        .catch(({ response }) => {
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
    }
  },
  created () {
    this.fetchCarts()
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    loading () {
      return this.$store.state.loadingFetchCarts
    }
  }
}
</script>

<style scoped>
.shop-icon {
  font-size: 7rem;
}

.shop-icon:hover {
  cursor: pointer;
}

.shop-text {
  font-size: 3rem;
}

.cart-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-list-container table td {
  vertical-align: middle
}

.product-img {
  width: 100px
}

.edit-quantity form {
  display: flex;
  flex-direction: column;
}

.btn-edit-quantity {
  width: 50%;
}
</style>
