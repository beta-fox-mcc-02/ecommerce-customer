<template>
  <b-row>
    <b-col class="pd-0" sm="6">
      <img class="img-fluid h-100 w-100 d-block" src="../assets/images/login-register.jpg" alt="Marine Diesel"/>
    </b-col>
    <b-col class="pd-0" sm="6">
      <router-view/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style lang="scss" scoped>
  .h-100 {
    height: 100vh !important;
  }
  .pd-0 {
    padding-right: 0px;
    padding-left: 0px;
  }
</style>
