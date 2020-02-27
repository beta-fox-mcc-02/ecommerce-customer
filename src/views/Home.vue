<template>
  <fragment>
      <Navbar/>
      <div class="wrapper">
        <router-view />
      </div>
  </fragment>
</template>

<script>
// @ is an alias to /src
import { Fragment } from 'vue-fragment'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Home',
  components: {
    Fragment,
    Navbar
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    margin-top: 56px;
  }
</style>
