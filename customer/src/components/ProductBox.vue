<template>
  <div class="text-left container my-3 py-3 shadow p-3 mb-5 rounded box-view">
    <div class="head">
      <span style="font-size: 25px; font-weight: 600;">All Products</span>
      <input type="text" class="float-right" placeholder="Search watch name..." v-model="search">
    </div>
    <Loading v-if="loading"/>
    <div class="row mt-2" v-else>
      <Card v-for="watch in searchFilter" :key="watch.id" :watch="watch" class="col-md-3"/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import Loading from './Loading'
export default {
  name: 'MenBox',
  data () {
    return {
      search: ''
    }
  },
  components: {
    Card,
    Loading
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    showProducts () {
      return this.$store.state.products
    },
    searchFilter () {
      return this.showProducts.filter(watch => watch.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
