<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.token) {
      next('/');
    } else {
      next();
    }
  },
};
</script>

<style>

</style>
