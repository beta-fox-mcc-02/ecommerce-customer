<template>
  <div class="signUp-container">
    <form class="form-signUp-container" @submit.prevent="signUp">
      <div class="alert alert-secondary alert-style" role="alert" v-if="signUpSuccess">
        {{  message }},
        <router-link class="" to="/signIn">
          <p class="p-0 m-0 btn">Sign In Here!</p>
        </router-link>
      </div>
      <div class="alert alert-danger alert-style" role="alert" v-if="signUpError">
        {{ message }}
      </div>
      <loading v-if="loading"/>
      <div class="form-group input-self">
        <label for="email">Email: </label>
        <input type="email" class="form-control" id="email" placeholder="email" required v-model="email">
      </div>
      <div class="form-group input-self">
        <label for="password">Password: </label>
        <input type="password" class="form-control" id="password" placeholder="password" required v-model="password">
      </div>
      <button class="btn btn-dark" type="submit">Sign Up</button>
      <router-link class="p-0 m-3" to="/signIn">
        <p class="mt-3 btn">already have an account?</p>
      </router-link>
    </form>
  </div>
</template>
<script>
import Loading from '../components/Loading.vue'

export default {
  name: 'SignUp',
  components: {
    Loading
  },
  data () {
    return {
      email: '',
      password: '',
      signUpSuccess: false,
      signUpError: false
    }
  },
  methods: {
    signUp () {
      const signUpData = {
        email: this.email,
        password: this.password
      }

      this.$store.commit('SET_SIGN_UP_DATA', signUpData)

      return this.$store.dispatch('signUp')
        .then(({ data }) => {
          this.$store.commit('SET_LOADING_SIGNUP', false)
          this.$store.commit('SET_MESSAGE', data.msg)
          this.signUpError = false
          this.signUpSuccess = true
        })
        .catch(({ response }) => {
          this.$store.commit('SET_LOADING_SIGNUP', false)
          this.$store.commit('SET_MESSAGE', response.data.msg)
          this.signUpError = true
          this.signUpSuccess = false
        })
    }
  },
  computed: {
    loading () {
      return this.$store.state.loadingSignUp
    },
    message () {
      return this.$store.state.message
    }
  }
}
</script>

<style>
.signUp-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.form-signUp-container {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.alert-style {
  max-width: 100%;
}
</style>
