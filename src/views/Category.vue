<template>
  <div id="allproducts">
    <!-- {{ categories.data }} -->
    <CategoryField v-for="category in categories.data" :key="category.id" :category="category"/>
  </div>
</template>

<script>
import CategoryField from '../components/CategoryField'

export default {
  name: 'Category',
  components: {
    CategoryField
  },
  computed: {
    categories () {
      return this.$store.state.listedCategory
    }
  }
}
</script>

<style scoped>
#allproducts {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: auto;
}
</style>
