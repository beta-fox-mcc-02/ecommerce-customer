<template>
  <CardHorizontal :product="product" />
</template>

<script>
import CardHorizontal from '../components/CardHorizontal.vue';
import productAPI from '../API/productAPI';

export default {
  components: {
    CardHorizontal,
  },
  data() {
    return {
      product: null,
    };
  },
  created() {
    this.$store.commit('setLoading');
    productAPI.get(`/${this.$route.params.productId}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch(() => {
        this.$router.push('/');
      })
      .finally(() => {
        this.$store.commit('stopLoading');
      });
  },
};
</script>

<style>

</style>
