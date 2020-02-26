<template>
  <div>
    <div class="row">
      <div id="categories" class="col s4 center">
        <div
          class="row category-row"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="col s12">
            <button :id="category.id" class="waves-effect waves-blue btn blue lighten-5 black-text">{{ category.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryButton',
  methods: {
    fetchCategories () {
      this.$store.dispatch('fetchCategories')
    }
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
