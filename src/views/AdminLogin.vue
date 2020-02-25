<template>
<div class="container">
    <br>
    <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
            <div class="card card-signup z-depth-0 text-center">
                <div class="card-header">
                    <img alt="Vuelogo" src="../assets/Zeon_Emblem.png" style="width: 100px">
                </div>
                <div class="card-body">
                    <label>LOGIN</label><div>
                      <b-form @submit.prevent="loginAdmin">
                        <b-form-group
                          id="input-group-1"
                          label="Email address:"
                          label-for="input-1"
                          description="We'll never share your email with anyone else."
                        >
                          <b-form-input
                            id="input-1"
                            v-model="loginEmail"
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
                            v-model="loginPass"
                            type="password"
                            required
                            placeholder="Enter Your Password"
                          ></b-form-input>
                        </b-form-group>
                        <b-button class="btn-success" type="submit" variant="primary">Login</b-button>
                      </b-form>
                    </div>
                    <br>
                    <Register></Register>
                </div>
            </div>
        </div>
        <div class="col-sm"></div>
    </div>
</div>
</template>

<script>
// import axios from 'axios'
import Register from '@/components/RegisterAdmin'
export default {
  name: 'AdminLogin',
  data () {
    return {
      loginEmail: '',
      loginPass: ''
    }
  },
  methods: {
    loginAdmin () {
      const admin = {
        email: this.loginEmail,
        password: this.loginPass
      }
      // console.log(admin)
      this.$store.dispatch('loginAdmin', admin)
    }
  },
  components: {
    Register
  },
  created () {
    // this.loginAdmin()
  }
}
</script>

<style>
</style>
