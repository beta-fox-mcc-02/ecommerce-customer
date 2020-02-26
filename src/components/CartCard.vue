<template>
  <div id="cart-card">
    <div class="card mx-3 mb-3" style="width: 16rem;">
      <span class="text-right" style="font-size: 20px">
        <i id="delete-item" class="fas fa-times" @click="deleteCartItem"></i>
      </span>
      <img
        id="image-card"
        class="align-self-center shadow my-3"
        :src="product.Product.image_url"
        style="display: block;
            max-width:200px;
            min-height:200px;
            width: auto;
            height: auto"
      />
      <div class="card-body">
        <h5 class="card-title" @click="pindah">{{product.Product.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Stock {{product.Product.stock}}</h6>
        <p class="card-text text-left">
          <strong>Rp. {{product.Product.price}}</strong>
        </p>
        <hr />
        <div class="d-flex justify-content-center mb-3 p-0">
          <small class="text-muted"><i>*purchase quantity</i></small>
        </div>
        <div class="row" style="display:flex; justify-content: space-around">
          <h6 id="toggle-quantity" style="cursor: pointer" @click="minQuantity">
            <i class="fas fa-minus"></i>
          </h6>
          <p class="mx-3">
            <strong>{{product.quantity}}</strong>
          </p>
          <h6 id="toggle-quantity" style="cursor: pointer" @click="addQuantity">
            <i class="fas fa-plus"></i>
          </h6>
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-dark" style="display-block" @click="checkout">purchase</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axiosInstance";
export default {
  name: `CartCard`,
  props: ["product"],
  data() {
    return {};
  },
  methods: {
    deleteCartItem() {
      //   sini kasih loading
      axios({
        method: `DELETE`,
        url: `/carts/${this.product.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.commit("NOTIFICATION", data.message);
          this.$store.dispatch("getAllMyCart");
        })
        .catch(err => {
          console.log(err.response.data.msg);
        });
    },
    pindah() {
      this.$router.push(`/store/${this.product.ProductId}`);
    },
    addQuantity () {
      //  kasih loading
       axios({
          method: `PUT`,
          url: `/carts/${this.product.id}`,
          data: {
             quantity: 1
          },
          headers: {
             token: localStorage.token
          }
       })
         .then(({data}) => {
            this.$store.dispatch('getAllMyCart')
         })
         .catch(err => {
            this.$store.commit('NOTIFICATION', err.response.data.msg)
            
         })
    },
    minQuantity () {
      //  kasih loading
       axios({
          method: `PUT`,
          url: `/carts/${this.product.id}`,
          data: {
             quantity: (-1)
          },
          headers: {
             token: localStorage.token
          }
       })
         .then(({data}) => {
            this.$store.dispatch('getAllMyCart')
         })
         .catch(err => {
            console.log(err.response);
            
            this.$store.commit('NOTIFICATION', err.response.data.errors[0])
         })
    },
    checkout() {
      //  kasih loading
       axios({
          method: `PUT`,
          url: `/carts/checkout/${this.product.id}`,
          headers: {
             token: localStorage.token
          }
       })
         .then(_ => {
            this.$store.commit('NOTIFICATION', `Successfully purchased ${this.product.Product.name}`)
            this.$store.dispatch('getAllMyCart')
         })
         .catch( err => {
            console.log(err.response.data.msg);
            
         })
    }
  }
};
</script>

<style scoped>
.card {
  border: none;
}

#delete-item:hover {
  color: rgb(235, 17, 53);
  cursor: pointer;
}

h5:hover {
  cursor: pointer;
  color: rgb(235, 17, 53);
}

#toggle-quantity:hover {
  cursor: pointer;
  color: rgb(235, 17, 53);
}
</style>