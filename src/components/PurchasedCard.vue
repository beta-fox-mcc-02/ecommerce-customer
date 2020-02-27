<template>
  <div id="cart-card">
    <div class="card mx-3 mb-3" style="width: 16rem;">
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
        <h6 class="card-subtitle mb-2 text-muted">quantity {{product.quantity}}</h6>

        <small class="text-muted">
          <i>*total price</i>
        </small>
        <p class="card-text text-left">
          <strong>Rp. {{formatedTotal}}</strong>
        </p>

        <div class="text-center">
          <small class="text-muted">
            <i>purchased at</i>
          </small>
          <p class="card-text text-muted">
            {{date}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `PurchasedCart`,
  props: ["product"],
  methods: {
    pindah() {
      this.$router.push(`/store/${this.product.ProductId}`);
    }
  },
  computed: {
    total() {
      return this.product.quantity * this.product.Product.price;
    },
    date() {
      let tanggalan = new Intl.DateTimeFormat("us", {
        weekday: `long`,
        year: `numeric`,
        month: `long`,
        day: `numeric`
      }).format(new Date(this.product.updatedAt));
      return tanggalan
    },
    formatedTotal () {
      return (this.total).toLocaleString('id-ID')
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
