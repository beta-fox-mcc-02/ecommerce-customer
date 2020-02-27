<template>
<main class="page catalog-page">
  <br><br><br>
  <section class="clean-block clean-catalog dark">
    <div class="container">
      <div class="block-heading">
        <h2 class="text-info">Catalog Page</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
          auctor in, mattis vitae leo.</p>
      </div>
      <div class="content">
        <div class="row justify-content-around align-items-center">
          <div class="col-md-12 col-lg-11 offset-lg-1">
            <div class="products">
              <div class="row no-gutters">
                <div class="col-12 col-md-6 col-lg-4" v-for="item in products" :key="item.id">
                  <div class="clean-product-item">
                    <div class="image"><a href="#"><img class="img-fluid d-block mx-auto"
                          :src="item.image_url" /></a></div>
                    <div class="product-name"><a href="#">{{ item.name }}</a></div>
                    <div class="d-lg-flex justify-content-between align-items-lg-center about">
                <div class="price">
                  <h3>{{ 'Rp. ' + Number(item.price).toLocaleString('id') }}</h3>
                </div>
                <div class="rating"><button class="btn btn-primary" type="button"
                    @click="addToCart({ ProductId: item.id,
                                        name: item.name,
                                        price: item.price,
                                        stock: item.stock })"
                    style="font-size: 16px;"><i class="fas fa-cart-plus"></i>Add</button></div>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Catalogue',
  components: {
  },
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
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addToCart(payload) {
      this.$store.state.cart.push(payload);
      console.log(this.$store.state.cart);
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
