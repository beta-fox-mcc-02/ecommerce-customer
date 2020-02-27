<template>
  <div>
    <div class="card m-3" style="width: 15rem" @click.prevent="pindah(product.id)">
      <img class="card-img-top" :src="product.image_url" alt="Card image cap" />
      <div class="card-body">
        <!-- {{product}} -->
        <h5>{{product.name}}</h5>
        <h5>${{product.price}}</h5>
      </div>
      <!-- <div class="caption text-white">
  <h3>{{product.name}}</h3>
    <h4>${{product.price}}</h4>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pindah(id) {
      this.$router.push(`/shop/${id}`);
      console.log("here");
    }
  },
  props: {
    product: Object
  },
  computed: {
    getImage() {
      return {
        "background-image": this.product.image_url,
        width: "20rem"
      };
    }
  },
  created() {
    // console.log(this.product, " card");
  }
};
</script>

<style scoped>
.caption {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translate(-50%, -50%);
}

img {
  max-width: 30rem;
}
</style>