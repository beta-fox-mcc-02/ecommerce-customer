<template>
  <div class="card bg-transparent my-2">
    <div class="row">
      <div class="col-md-3">
        <img :src="cart.Product.imageUrl" alt="image watch">
      </div>
      <div class="col-md-8 pt-4">
        <p>Name : {{ cart.Product.name }}</p>
        <p>Quantity : {{ cart.quantity }}</p>
        <p>Price : Rp. {{ price }},-</p>
        <div class="button-group mt-4">
          {{ $route.currentRoute }}
          <button class="btn" @click="addMore(cart.ProductId)">Add More</button>
          <button class="btn float-right delete" @click.prevent="deleteCart(cart.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCart',
  props: {
    cart: Object
  },
  methods: {
    addMore (id) {
      this.$router.push(`/products/${id}`)
    },
    deleteCart (id) {
      this.$alertify.confirmWithTitle(
        'Delete this product from cart ?',
        `after deleting, data will be remove from server`,
        () => {
          this.$store.dispatch('deleteCart', id)
            .then(_ => {
              Toastify({
                text: 'Success Deleting Cart',
                backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                className: 'success'
              }).showToast()
              this.$store.dispatch('fetchCart')
            })
            .catch(_ => {})
        }
      )
    }
  },
  computed: {
    price () {
      //  return (this.cart.quantity * this.cart.Product.price).toLocaleString("id-ID")
       return (this.cart.Product.price).toLocaleString("id-ID")
    }
  }
}
</script>

<style scoped>
p:hover {
  cursor: text;
}

p {
  margin: 0;
}

.delete {
  background: rgb(183, 0, 255) !important;
}

.delete:hover {
  background: rgb(255, 38, 0) !important;
}
</style>
