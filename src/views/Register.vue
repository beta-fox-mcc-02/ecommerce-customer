<template>
  <div class="container" style="width: 50vh" >
    <div class="form-register" v-if="!isLoading">
      <h4>Register</h4>
      <b-form @submit.prevent="register">
        <b-form-group label="Name:">
          <b-form-input
          v-model="name"
          required
          placeholder="Your Name Please"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Address:" description="Need for Delivery">
          <b-form-textarea
          v-model="address"
          required
          placeholder="Your Address Home"
          rows="3"
          max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label="Email:" description="We'll never share your email with anyone else.">
          <b-form-input
          v-model="email"
          required
          placeholder="Your Email Please"
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
      <div class="spinner-border" role="status">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      address: '',
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    register () {
      this.isLoading = true
      const payload = {
        name: this.name,
        address: this.address,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
        .then(user => {
          this.isLoading = false
          this.$router.push({ path: '/login' })
          this.$vToastify.success('Registerr Success')
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

.form-register {
  border: none;
  border-radius: 5px;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.40);
  padding: 10px 10px;
}
</style>
