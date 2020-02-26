<template>
  <form class="login-manual" @submit.prevent="loginProcess">
    <label>Email</label>
    <b-form-input type="email" v-model="email" placeholder="Enter your email"></b-form-input>
    <label>Password</label>
    <b-form-input type="password" v-model="password" placeholder="Enter your password"></b-form-input>
    <button type="submit" style="background-color:blue; color:white">Login</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginProcess () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginOn', payload)
    }
  }
}
</script>

<style>
  .login-manual button, label {
    margin-top: 10px;
  }
</style>
