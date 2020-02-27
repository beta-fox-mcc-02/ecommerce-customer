<template>
  <div class="card bg-transparent my-2 col-md-3" @click="toDetail(watch.id)">
    <img :src="watch.imageUrl" alt="watch" style="width: 100%">
    <div class="container">
      {{ watch.name }}
      <p>Rp. {{ price }},- </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    watch: Object
  },
  computed: {
    price () {
      return (this.watch.price).toLocaleString("id-ID")
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style scoped>
.card {
  transition: 0.3s;
  width: 20%;
}
p {
  color: orange;
  font-size: 15px;
}
p,
.container {
  line-height: normal;
  font-weight: 700;
}
.container {
  padding: 2px 16px;
  font-size: 80%;
  font-weight: 500;
}
</style>
