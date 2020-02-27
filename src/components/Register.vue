<template>
<div>
  <b-button class="bg-white text-dark" v-b-modal.registerForm>dont have account yet?</b-button>
  <b-modal id="registerForm" title="Register" class="text-center">
        <b-form @submit.prevent="register" class="text-center">
              <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
              >
              <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="Enter email"
              ></b-form-input>
              </b-form-group>
              <b-form-group
              id="input-group-2"
              label="Your Password:"
              label-for="input-2"
              description="Password min 5 characters.">
              <b-form-input
              id="input-2"
              type='password'
              v-model="password"
              required
              placeholder="Enter Your Password"
            ></b-form-input>
          </b-form-group>
       <b-button class="btn-success" type="submit" variant="primary">Register</b-button>
    </b-form>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'AdminRegister',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      console.log('masuuuuuuuk')
      const costumer = {
        email: this.email,
        password: this.password
      }
      // console.log(admin)
      this.$store.dispatch('registerCostumer', costumer)
    }
  }
}
</script>

<style>

</style>
