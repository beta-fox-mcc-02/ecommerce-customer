<template>
  <div class="signIn-area">
    <div class="card card-body card-signIn">
      <form @submit.prevent="signIn">
        <loading v-if="signInLoading"/>
        <div class="alert alert-danger alert-style" role="alert" v-if="signInError">
          {{ message }}
        </div>
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
import Loading from '../components/Loading.vue'

export default {
  name: 'SignIn',
  components: {
    Loading
  },
  data () {
    return {
      email: '',
      password: '',
      signInLoading: false,
      signInError: false
    }
  },
  methods: {
    signIn () {
      this.signInLoading = true
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
          this.$router.push({ name: 'Cart' })
          this.$store.commit('SET_CURRENT_PAGE', 'Cart')
          this.$store.commit('SET_IS_LOGIN', true)
          this.signInError = false
          this.signInLoading = false
        })
        .catch(({ response }) => {
          this.$store.commit('SET_MESSAGE', response.data.msg)
          this.signInError = true
          this.signInLoading = false
        })
    }
  },
  computed: {
    message () {
      return this.$store.state.message
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
