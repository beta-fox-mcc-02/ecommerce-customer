<template>
  <div>
    <h1>find the one for you</h1>
    <img src="../assets/loading.gif" alt v-if="seeLoading" />
    <div class="container" v-else>
      <div class="row">
        <productCard v-for="product in getProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "../components/productCard";
export default {
  data() {
    return {
      
    }
  },
  components: {
    productCard
  },
  computed: {
    getProducts() {
      // this.loading = false
      return this.$store.state.products;
    },
    seeLoading() {
      return this.$store.state.loading;
    }
  },
  created: function() {
    this.$store.dispatch("fetchProduct");
    this.loading = true;
    // console.log(this.getProducts, " <<<");
    // console.log(this.$store.state.products);
    // console.log(this.seeLoading);
  }
};
</script>

<style>
</style>