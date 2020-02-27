<template>
  <div class="login">
    <h1>Login Form</h1> <br>
    <form @submit.prevent="userLogin">
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
        value="LOGIN"
      ><br>

      <center><label>No account?</label>
      <a href="" @click.prevent="ubahForm(false)">Register Here</a></center>
    </form>
  </div>
</template>

<script>
// import Register from '@/components/Register.vue'

export default {
  name: 'userLoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    userLogin () {
      const User = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('userLogin', User)
        .then(success => {
          this.$alertify.success(`Selamat datang, ${this.email}`)
          const { token } = success.data

          this.$emit('showContent', 'Home')
          localStorage.setItem('token', token)
        })
        .catch(err => {
          const { msg } = err.response.data

          this.$alertify.error(msg)
        })
    },
    ubahForm (status) {
      this.$emit('ubahForm', status)
    },
    clog () {
      console.log('errrrrpr')
    }
  }
  // watch: {
  //   email (value) {
  //     console.log(value)
  //   }
  // }
}
</script>

<style>
</style>
