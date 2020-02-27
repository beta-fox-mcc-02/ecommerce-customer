<template>
    <main class="page catalog-page">
      <section class="clean-block clean-catalog dark">
        <div class="container">
          <div class="block-heading">
            <br><br>
            <h2 class="text-info">Product List</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim
              nec auctor in, mattis vitae leo.</p>
          </div>
          <div class="content">
            <div class="row">
              <div class="col-md-12">
                <div class="products">
                    <product-list />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script>
import ProductList from './ProductCard.vue';

export default {
  components: {
    ProductList,
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
