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
        @click="onAddToCart(product.id)"
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
    onAddToCart(id) {
      if (!localStorage.access_token) {
        this.$router.push('/register');
        console.log('you must register first');
      }
      const cart = this.$store.state.carts.filter(el => el.ProductId === id);
      if (cart.length) {
        const payload = {
          id: cart[0].id,
          data: {
            status: cart[0].status,
            ProductId: cart[0].ProductId,
            quantity: cart[0].quantity + 1
          }
        };
        this.$store.dispatch('addItemToCart', payload)
          .then(() => {
            return this.$store.dispatch('fetchCarts');
          })
          .then(({ data }) => {
            const payload = [];
            data.forEach(el => {
              payload.push({
                id: el.id,
                UserId: el.UserId,
                ProductId: el.ProductId,
                status: el.status,
                quantity: el.quantity,
                totalPrice: el.price,
                name: el.Product.name,
                price: el.Product.price
              });
            });
            this.$store.commit('SET_CARTS', payload);
            this.$router.push('/cart');
          })
          .catch(({ response }) => {
            console.log(response);
          });
      } else {
        const payload = {
          status: false,
          quantity: 1,
          ProductId: id
        };
        this.$store.dispatch('createNewCart', payload)
          .then(() => {
            return this.$store.dispatch('fetchCarts');
          })
          .then(({ data }) => {
            const payload = [];
            data.forEach(el => {
              payload.push({
                id: el.id,
                UserId: el.UserId,
                ProductId: el.ProductId,
                status: el.status,
                quantity: el.quantity,
                totalPrice: el.price,
                name: el.Product.name,
                price: el.Product.price
              });
            });
            this.$store.commit('SET_CARTS', payload);
            this.$router.push('/cart');
          })
          .catch(({ response }) => {
            console.log(response);
          });
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