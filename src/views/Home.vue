<template>
  <div class="home">
    <LandingPage/>
    <AllProduct/>
  </div>
</template>

<script>
import LandingPage from '../components/LandingPage'
import AllProduct from '../components/AllProduct'

export default {
  name: 'Home',
  components: {
    LandingPage,
    AllProduct
  }
}
</script>
