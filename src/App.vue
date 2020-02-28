<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './views/Navbar_All'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
</style>
