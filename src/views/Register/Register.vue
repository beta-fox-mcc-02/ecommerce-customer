<template>
 <div id="register">
   <RegisterCard id="register-card" />
   <div class="row">
     <div class="col s12 center">
       <p><a href="#" @click.prevent="$router.push('/')">Back to Home</a></p>
     </div>
   </div>
 </div>
</template>

<script>
import RegisterCard from './components/RegisterCard'
export default {
  name: 'Register',
  components: {
    RegisterCard
  }
}
</script>

<style scoped>
  p {
    font-size: 15pt
  }
  #register-card {
    margin-top: 8rem
  }
</style>
