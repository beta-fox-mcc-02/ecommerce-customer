<template>
  <b-row>
    <b-col sm="6">
      <img class="img-fluid w-100 d-block" src="../assets/images/login-register.jpg" alt="Marine Diesel"/>
    </b-col>
    <b-col>
      <router-view/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Auth'
}
</script>
