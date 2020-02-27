<template>
<div >
  <div class="col-12 col-md-6 col-lg-4" v-for="item in products" :key="item.id" >
    <div class="clean-product-item">
      <div class="image"><a href="#"><img class="img-fluid d-block mx-auto"
            :src="item.image_url" /></a></div>
      <div class="product-name"><a href="#">{{ item.name }}</a></div>
      <div class="about">
        <div class="rating"><button class="btn btn-primary" type="button"
            style="font-size: 16px;"><i class="fas fa-cart-plus"></i>Add</button>
        </div>
        <div class="price">
          <h3>{{ 'Rp. ' + Number(item.price).toLocaleString('id') }}</h3>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProduct() {
      this.$store.dispatch('getProduct')
        .then((result) => {
          this.products = result.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
