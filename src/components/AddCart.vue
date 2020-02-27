<template>
  <div class="add-cart-container">
    <div class="card card-body card-add-cart">
      <div class="alert alert-danger alert-style message-error" role="alert" v-if="message">
        {{ message }}
      </div>
      <form @submit.prevent="addCart">
        <div class="form-group">
          <input type="number" min="1" class="form-control" placeholder="Quantity" required v-model="quantity">
        </div>
        <button class="btn btn-dark" type="submit">Add to your cart</button>
      </form>
    </div>
    <i class="fa fa-times btn" aria-hidden="true" @click="closeAddCartForm"></i>
  </div>
</template>

<script>
import axios from '../config/axios'

export default {
  name: 'AddCart',
  data () {
    return {
      quantity: null,
      message: ''
    }
  },
  computed: {
    productIdForAddCart () {
      return this.$store.state.productIdForAddCart
    }
  },
  methods: {
    closeAddCartForm () {
      this.$store.commit('SET_ADD_CART_FORM_SHOW', false)
    },
    addCart () {
      axios({
        method: 'POST',
        url: '/carts',
        data: {
          ProductId: this.productIdForAddCart,
          quantity: Number(this.quantity)
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_ADD_CART_FORM_SHOW', false)
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
          this.message = ''
        })
        .catch(({ response }) => {
          this.message = 'product quantity is not enough'
          this.$store.commit('SET_LOADING_FETCH_CARTS', false)
        })
    }
  }
}
</script>

<style>
.add-cart-container {
  display: flex;
}

.card-add-cart {
  background-color: rgba(148, 148, 148, 0.664);
}

.message-error {
  font-size: 1rem;
}
</style>
