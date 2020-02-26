<template>
  <fragment>
    <CircularLoading v-if="isLoading && !categories" />
    <div v-if="!isLoading && categories" class="categories">
      <div class="category" v-for="category in categories" :key="category.id">
        <div class="name">
          <router-link :to="`/products/category/${category.path}`">
            <a>{{ category.name }}</a>
          </router-link>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import CircularLoading from '@/components/CircularLoading.vue'
import { Fragment } from 'vue-fragment'
export default {
  name: 'Categories',
  components: {
    CircularLoading,
    Fragment
  },
  created () {
    this.$store.dispatch('fetchCategories')
      .then(response => {
        this.$store.commit('SET_CATEGORIES', response.data)
        this.$store.commit('SET_LOADING_CATEGORIES', false)
      })
      .catch(err => {
        this.$tore.commit('SET_ERRORS', err.response)
        this.$store.commit('SET_LOADING_CATEGORIES', false)
      })
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoadingCategories
    },
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>
