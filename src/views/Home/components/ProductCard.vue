<template>
  <v-card :loading="loading" class="mx-auto my-5" max-width="374">
    <v-img height="200" :src="product.image_url"></v-img>

    <v-card-title>{{product.name}}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :value="randomNumber" color="amber" dense half-increments readonly size="14"></v-rating>
        <div class="grey--text ml-4">{{randomNumber}} (rating)</div>
      </v-row>
      <div class="my-4 subtitle-1">
        <h4>Stock : {{productStock}}</h4>
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>{{productPrice}}</v-card-title>

    <v-card-actions>
      <v-btn
        color="teal"
        class="ml-auto"
        text
        @click="onAddToCart"
        :disabled="disableAddToCart"
      >Add To Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductPage",
  props: {
    product: Object
  },
  data: () => ({
    loading: false,
    selection: 1,
    disableAddToCart: false
  }),

  methods: {
    onAddToCart() {
      console.log('onnAddToCart');
      if (!localStorage.access_token) {
        this.$router.push('/register');
        console.log('you must register first');
      }
    }
  },
  computed: {
    randomNumber() {
      return +(Math.random() * 5).toFixed(1);
    },
    productStock() {
      const item = this.product.stock === 1 ? 'item' : 'items';
      return `${this.product.stock} ${item}`;
    },
    productPrice() {
      return `Rp${this.product.price.toLocaleString('id-ID', 'currency')}`;
    }
  }
}
</script>