<template>
  <div class="col-md-3 flex">
    <b-card>
      <b-card-title>{{ name }}</b-card-title>
      <b-card-img :src="image_url ? image_url : 'https://static.thenounproject.com/png/340719-200.png'">
      </b-card-img>
      <b-button @click="clickDetails()" variant="outline-success">Details</b-button>
      <b-card-text class="price">
        Rp. {{ price.toLocaleString() }}
      </b-card-text>
      <b-card-text class="small text-muted">
        {{ stock ? `Stock: ${stock}` : 'Empty Stock' }}
      </b-card-text>
    </b-card>
</div>
</template>

<script>
export default {
  props: {
    productId: Number,
    name: String,
    price: Number,
    stock: Number,
    image_url: String,
  },
  methods: {
    clickDetails() {
      this.$router.push(`/product/${this.productId}`);
    },
  },
};
</script>

<style scoped>
  .card{
    width: 250px;
    margin: 15px auto;
  }
  .flex{
    display: flex;
    justify-content: center
  }
  .small {
    font-weight: 700;
  }
  .price {
    font-size: 20px;
  }
</style>
