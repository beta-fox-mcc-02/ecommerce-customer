<template>
  <div>
    <ProductBox v-if="!$route.params.id"/>
    <router-view></router-view>
  </div>
</template>

<script>
import ProductBox from '../components/ProductBox'
export default {
  name: 'LadiesPage',
  components: {
    ProductBox
  }
}
</script>

<style>

</style>
