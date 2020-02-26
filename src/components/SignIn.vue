<template>
  <div class="signIn-area">
    <div class="card card-body card-signIn">
      <form @submit.prevent="signIn">
        <div class="form-group">
          <label for="email">Email: </label>
          <input type="email" class="form-control" id="emial" placeholder="email" required v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password: </label>
          <input type="password" class="form-control" id="password" placeholder="password" required v-model="password">
        </div>
        <button class="btn btn-dark" type="submit">Sign In</button>
      </form>
    </div>
    <i class="fa fa-times btn" aria-hidden="true" @click="closeSignInForm"></i>
  </div>
</template>

<script>
import axios from '../config/axios'

export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    closeSignInForm () {
      this.$router.go(-1)
    },
    signIn () {
      axios({
        method: 'POST',
        url: '/users/signIn',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.signIn-area {
  position: absolute;
  right: 0;
  display: flex;
  z-index: 10;
}

.card-signIn form {
  width: 17vw;
}
</style>
