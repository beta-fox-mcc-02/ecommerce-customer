<template>
  <div class="home">
    <LandingPage/>
    <AllProducts/>
  </div>
</template>

<script>
import LandingPage from '../components/LandingPage'
import AllProducts from '../components/AllProduct'

export default {
  name: 'Home',
  components: {
    LandingPage,
    AllProducts
  }
}
</script>
