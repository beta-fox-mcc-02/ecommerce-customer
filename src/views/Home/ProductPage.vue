<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" v-for="n in 10" :key="n">
        <ProductCard />
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
  }
}
</script>

<style>
</style>


