<template>
  <div class="cust">
    <div class="home_cust">
      <Card/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/home/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  },
  created () {
    this.$store.commit('CHANGE_PAGE', 'home')
  }
}
</script>
