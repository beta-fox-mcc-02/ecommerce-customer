<template>
  <v-card :loading="loading" class="mx-auto my-5" max-width="374">
    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

    <v-card-title>Nama Product</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :value="randomNumber" color="amber" dense half-increments readonly size="14"></v-rating>
        <div class="grey--text ml-4">{{randomNumber}} (rating)</div>
      </v-row>
      <div class="my-4 subtitle-1">
        <h4>Stock Barang</h4>
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Harga Barang</v-card-title>

    <v-card-actions>
      <v-btn color="teal" class="ml-auto" text @click="onAddToCart">Add To Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductPage",
  data: () => ({
    loading: false,
    selection: 1,
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
    }
  }
}
</script>