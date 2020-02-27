<template>
  <div class="text-left container my-3 py-3 shadow p-3 mb-5 rounded box-view">
    <div class="head">
      <h4>Ladies Watches</h4>
    </div>
    <Loading v-if="loading"/>
    <div class="row mt-2 justify-content-around" v-else>
      <Card v-for="watch in showProducts" :key="watch.id" :watch="watch" class="col-md-3"/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import Loading from './Loading'
export default {
  name: 'LadiesBox',
  components: {
    Card,
    Loading
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    showProducts () {
      return this.$store.getters.ladiesBox
    }
  }
}

</script>

<style>

</style>
