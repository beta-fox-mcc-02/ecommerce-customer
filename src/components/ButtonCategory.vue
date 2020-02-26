<template>
  <div class="category" @click.prevent="changePage">
    <a class="content" v-for="category in categories" :key="category.id">
      {{ category.name }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Button-Category',
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
          console.log(err.response)
        })
    },
    changePage () {
      this.$router.push({ path: '/jersey' })
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

.content {
  border: none;
  border-radius: 10px;
  font-size: 25px;
  margin: 0 20px;
  margin-top: 80px;
  text-decoration: none;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.40);
  padding: 5px 20px;
  cursor: pointer;
}

.content:hover {
  background-color: blue
}
</style>
