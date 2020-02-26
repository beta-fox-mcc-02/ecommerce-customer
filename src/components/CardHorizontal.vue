<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img style="padding: 30px" :src="product.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col style="text-align: left">
          <b-card-body :title="product.name">
            <b-card-text class="custom-text">
              <div class="container-info">
                <h5>Price</h5>
                <p>Rp. {{ product.price.toLocaleString() }}</p>
              </div>
              <div class="container-info">
                <h5>Stock</h5>
                <p>{{ product.stock }}</p>
              </div>
              <div class="container-info">
                <h5>Description</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Quia nobis accusantium,
                  in voluptatem ratione nisi maxime laborum eveniet,
                  veritatis assumenda reiciendis laboriosam perspiciatis
                  alias dignissimos repellat, minima cumque ipsa fugit.
                </p>
              </div>
              <a @click.prevent="toggleAddCart" style="font-size: 20px" href>Add to Cart</a>
              <div v-if="showAddCart" style="margin-top: 15px">
                <label for="sb-small">Quantity</label>
                <b-form-spinbutton
                style="max-width: 250px"
                id="sb-small"
                size="sm"
                min="0"
                max="5"
                v-model="quantity"
                step="1"
                class="mb-2">
                </b-form-spinbutton>
                <b-button pill variant="success">Update Cart</b-button>
              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
      showAddCart: false,
    };
  },
  props: {
    product: Object,
  },
  methods: {
    toggleAddCart() {
      if (localStorage.token) {
        if (this.showAddCart) {
          this.showAddCart = false;
        } else {
          this.showAddCart = true;
        }
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style>
  .card-title{
    font-weight: 700;
  }
  .custom-text p{
    margin: 0;
  }
  .custom-text h5{
    margin: 0
  }
  .container-info{
    margin: 20px 0;
  }
</style>
