<template>
  <div id="categories" class="col s3">
    <h5>Categories</h5>
    <div class="row category-row">
      <div class="col s12">
        <button
          class="waves-effect waves-blue btn blue lighten-5 black-text"
          @click.prevent="$store.commit('PRODUCTS_FILTER', null)"
        >All Products</button>
      </div>
    </div>
    <div
      class="row category-row"
      v-for="category in categories"
      :key="category.id"
    >
      <div class="col s12">
        <button
          :id="category.id"
          class="waves-effect waves-blue btn blue lighten-5 black-text"
          @click.prevent="$store.commit('PRODUCTS_FILTER', category.id)"
        >{{ category.name }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  methods: {
    fetchCategories () {
      this.$store.dispatch('fetchCategories')
    },

    groupProducts (categoryId) {}
  },
  created () {
    this.fetchCategories()
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style scoped>
  .category-row{
    margin: 3rem
  }
  #categories{
    border: 1rem;
    border-color: black;
    height: 40rem;
  }
</style>
