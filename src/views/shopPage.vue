<template>
  <div class="mt-5 ">
    <section class="banner-area mb-5">
      <!-- <img src="../assets/9-2.jpg" alt=""> -->
    </section>
    <!-- <h1>ini page shop</h1> -->
    
          <router-view />

  </div>
</template>
<script>
export default {

}
</script>

<style scoped>
.banner-area{
  padding-top: 0;
  background-image: url("../assets/9-2.jpg");
  height: 80vh;
  background-repeat: no-repeat;
  background-position: center;
}
</style>