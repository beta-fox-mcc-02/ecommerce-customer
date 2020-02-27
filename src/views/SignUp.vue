<template>
  <div class="signUp-container">
    <form class="form-signUp-container" @submit.prevent="signUp">
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
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
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
          console.log(data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
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
</style>
