<template>
  <div class="container" style="width: 50vh">
    <div class="form-login" v-if="!isLoading">
      <h4>Login</h4>
      <b-form @submit.prevent="login">
        <b-form-group label="Email:">
          <b-form-input
          v-model="email"
          required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input
          v-model="password"
          required
          type="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border" role="status"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    login () {
      this.isLoading = true
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          this.isLoading = false
          this.$store.commit('FETCH_ISLOGEDIN', true)
          localStorage.setItem('token', data.token)
          this.$router.push({ path: '/' })
          this.$vToastify.success('login success')
        })
        .catch(err => {
          this.isLoading = false
          this.$vToastify.warning({
            title: 'BRO',
            body: `${err.response.data.msg}`,
            type: 'warning',
            duration: 3000
          })
        })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  margin-bottom: 60px;
}

.form-login {
  border: none;
  border-radius: 5px;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.40);
  padding: 10px 10px;
}
</style>
