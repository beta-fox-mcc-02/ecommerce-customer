<template>
  <div class="home">
    <b-card
      overlay
      img-src="../assets/banner.jpg"
      img-alt="Card Image"
      text-variant="white"
      style="margin-bottom: 50px"
    >
      <b-card-text style="font-size: 45px">
        E-commerce
      </b-card-text>
    </b-card>
    <div class="container">
        <div class="row">
          <Card v-for="product in listOfProducts"
          :key="product.id"
          :productId="product.id"
          :name="product.name"
          :image_url="product.image_url"
          :price="product.price"
          :stock="product.stock"/>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
  computed: {
    listOfProducts() {
      return this.$store.state.listOfProducts;
    },
  },
};
</script>
