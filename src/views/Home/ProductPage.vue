<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from './components/ProductCard';
export default {
  name: "CartPage",
  components: {
    ProductCard
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.dispatch('fetchAllProducts')
      .then(({ data }) => {
        console.log(data.data);
        this.$store.commit('SET_PRODUCTS', data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
}
</script>

<style>
</style>


