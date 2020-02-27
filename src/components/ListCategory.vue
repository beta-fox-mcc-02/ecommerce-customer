<template>
  <a class="content" href="" @click.prevent="toCategory">{{ category.name }}</a>
</template>

<script>
export default {
  name: 'List-Category',
  props: ['category'],
  methods: {
    toCategory () {
      console.log(this.category.id)
      this.$store.dispatch('findCategory', this.category.id)
        .then(({ data }) => {
          this.$store.commit('LISTED_CATEGORY', data)
          this.$router.push({ path: `/${this.category.name}` })
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
  }
}
</script>

<style scoped>
.content {
  border: none;
  border-radius: 10px;
  font-size: 25px;
  margin: 0 20px;
  margin-top: 80px;
  color: red;
  text-decoration: none;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.40);
  padding: 5px 20px;
  cursor: pointer;
}

.content:hover {
  background-color: blue
}
</style>
