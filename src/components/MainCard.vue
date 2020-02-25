<template>
  <div>
    <b-card
      title=" Best selection of electronics at Every Day Low Prices."
      img-src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/cityview3.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 100%; text-align: left; background: none; border: none;"
      class="mb-2"
    >
      <b-button href="" variant="primary" @click.prevent="toCatalog">CATALOG</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  methods: {
    toCatalog () {
      this.$router.push('/catalog')
    }
  }
}
</script>

<style>

</style>
