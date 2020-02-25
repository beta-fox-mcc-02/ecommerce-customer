<template>
  <div id="mycart">
     
  </div>
</template>

<script>
export default {
   name: `MyCart`,
   data () {
      return {

      }
   },
   methods: {

   },
   computed : {
      products () {
         return this.$store.state.allProduct
      }
   },
   created () {
      this.$store.dispatch('getAllItem')
   },
   beforeRouteEnter (to, from, next) {
      if (localStorage.token) {
         next()
      }
      else {
         next('/login')
      }
   }
}
</script>

<style>

</style>