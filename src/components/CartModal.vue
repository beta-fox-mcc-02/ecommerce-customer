<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <div class="row">
            <div class="col s10 offset-s1">
              <div class="card z-depth-3 blue lighten-5">
                <div class="card-content center">
                <a id="close" @click.prevent="$store.commit('CART_TRIGGER')" class="disabled grey-text right"><i class="material-icons">close</i></a>
                  <span class="card-title">YOUR SHOPPING CARTS</span>
                    <!-- Cart tabel -->
                    <div class="row">
                      <div  v-if="!carts.length" class="col s12">
                        <h6>Your shopping cart is currently empty</h6>
                        </div>
                        <div v-else class="col s12">
                          <table class="highlight centered">
                            <tr>
                              <th></th>
                              <th>Product Name</th>
                              <th>quantity</th>
                              <th>Price</th>
                              <th>Action</th>
                            </tr>
                            <tr v-for="(cart, i) in carts" :key="i">
                              <td><img :src="cart.Product.image_url" width="100rem" alt="Product img"></td>
                              <td>{{ cart.Product.name }}</td>
                              <td>{{ cart.quantity }}</td>
                              <td>{{ priceInRupiah(cart.total_price) }}</td>
                              <td>
                                <!-- <button class="waves-effect waves-blue btn-small blue lighten-5 black-text"><i class="material-icons">edit</i></button> -->
                                <button class="waves-effect waves-blue btn-small blue lighten-5 black-text" @click.prevent="deleteCart(cart.ProductId)"><i class="material-icons">delete</i></button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="3">Total:</td>
                              <td class="right">{{ totalPrice }}</td>
                            </tr>
                          </table>
                          <button class="waves-effect waves-blue btn-large blue lighten-5 black-text" @click.prevent="checkout">Checkout</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CartModal',
  methods: {
    priceInRupiah (price) {
      return 'Rp ' + Number(price).toLocaleString('id')
    },
    deleteCart (ProductId) {
      const payload = {
        ProductId
      }
      this.$store.dispatch('deleteCart', payload)
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  computed: {
    carts () {
      const unchecked = []
      this.$store.state.carts.forEach(cart => {
        if (!cart.status) unchecked.push(cart)
      })
      return unchecked
    },

    totalPrice () {
      let total = 0
      this.$store.state.carts.forEach(cart => {
        total += Number(cart.total_price)
      })
      return 'Rp ' + total.toLocaleString('id')
    }
  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
transition: opacity 0.5s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100rem;
  margin: 0px auto;
  overflow: auto
}

#close {
  cursor: pointer;
}
</style>
