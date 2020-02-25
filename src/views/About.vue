<template>
  <div id="about">
    <Navbar style="margin-bottom: 130px"/>
    <slot name="footer" class="text-light"></slot>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
  #about {
    height: 100vh;
    background-image: url('../assets/8.jpg');
    background-size: cover;
    background-position: 0px -30px; 
  }
  
</style>
