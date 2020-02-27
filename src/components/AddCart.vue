<template>
  <div class="add-cart-container">
    <div class="card card-body card-add-cart">
      <form @submit.prevent="addCart">
        <div class="form-group">
          <input type="number" class="form-control" id="password" placeholder="Quantity" required v-model="quantity">
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
      quantity: null
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
      console.log('userId=', Number(localStorage.getItem('userId')))
      console.log('productId=', this.productIdForAddCart)
      console.log('quantity=', Number(this.quantity))

      axios({
        method: 'POST',
        url: '/carts',
        data: {
          UserId: Number(localStorage.getItem('userId')),
          ProductId: this.productIdForAddCart,
          quantity: Number(this.quantity)
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$store.commit('SET_ADD_CART_FORM_SHOW', false)
        })
        .catch(({ response }) => {
          console.log(response)
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
</style>
