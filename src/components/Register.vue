<template>
   <div class="login">
    <h1>Register Form</h1> <br>
    <form @submit.prevent="userRegis">
      <label>Email</label>
      <input
        v-model="email"
        type="text"
        required
        class="form_login"
        placeholder="Input your email..."
      ><br>

      <label>Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        required
        class="form_login"
        placeholder="Input your password..."
      ><br>

      <input
        type="submit"
        id="login-button"
        class="btn_login"
        value="Register"
      ><br>

      <center><label>Have account?</label>
      <a href="" @click.prevent="ubahForm(true)">Login here</a></center>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    userRegis () {
      const User = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('userRegis', User)
        .then(success => {
          this.$alertify.success(`Success register ${this.email}`)
          const { token } = success.data

          this.$emit('showContent', 'Login')
          localStorage.setItem('token', token)
        })
        .catch(err => {
          const { msg } = err.response.data

          this.$alertify.error(msg)
        })
    },
    ubahForm (status) {
      this.$emit('ubahForm', status)
    }
  }
}
</script>

<style>

</style>
