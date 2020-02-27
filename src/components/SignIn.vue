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
        <router-link to="/signUp">
          <p class="mt-3 btn">Sign up here!</p>
        </router-link>
      </form>
    </div>
    <router-link to="/">
      <i class="fa fa-times btn" aria-hidden="true"></i>
    </router-link>
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
          localStorage.setItem('userId', data.UserId)
          localStorage.setItem('token', data.token)
          this.$router.push({ name: 'Cart' })
          this.$store.commit('SET_CURRENT_PAGE', 'Cart')
          this.$store.commit('SET_IS_LOGIN', true)
        })
        .catch(({ response }) => {
          console.log(response.data)
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
