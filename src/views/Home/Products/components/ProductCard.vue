<template>
  <div id="product-card">
    <div :id="id" class="card">
      <div class="card-image">
        <img :src="img_url" alt="product image">
      </div>
      <div class="card-content">
        <span class="card-title grey-text text-darken-4">{{ name }}</span>
      </div>
      <div class="card-content">
        <p>Rp {{ priceInRupiah }}</p>
      </div>
      <div class="card-action">
        <button
          class="waves-effect waves-blue btn-large blue lighten-5 black-text"
          @click.prevent="buyMenu"
        >Buy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    id: Number,
    name: String,
    img_url: String,
    price: Number
  },
  methods: {
    buyMenu () {
      if (!localStorage.token) {
        this.$store.commit('loginTrigger')
        this.$store.commit('ERROR', { message: 'Please login first to buy our products' })
      } else this.$router.push(`/${this.id}`)
    }
  },
  computed: {
    priceInRupiah () {
      return this.price.toLocaleString('id')
    }
  }
}
</script>

<style>

</style>
