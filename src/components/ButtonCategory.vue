<template>
  <div class="category">
    <ListCategory v-for="category in categories" :key="category.id" :category="category"/>
  </div>
</template>

<script>
import ListCategory from '../components/ListCategory'

export default {
  name: 'Button-Category',
  components: {
    ListCategory
  },
  computed: {
    categories () {
      return this.$store.state.category
    }
  },
  methods: {
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
        .then(categories => {
          this.$store.commit('FETCH_CATEGORY', categories.data.categories)
        })
        .catch(err => {
          this.$vToastify.warning({
            title: 'BRO',
            body: `${err.response.data.msg}`,
            type: 'warning',
            duration: 3000
          })
        })
    }
  },
  created () {
    this.fetchCategory()
  }
}
</script>

<style scoped>
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  color: brown;
  height: 144px;
  margin: 0px 20px;
}
</style>
