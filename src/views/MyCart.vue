<template>
  <div id="mycart">
     <h1>hehoooo</h1>
  </div>
</template>

<script>
import store from '../store/index'
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
         store.commit('NOTIFICATION', `You need to login first`)
         next('/login')
      }
   }
}
</script>

<style>

</style>