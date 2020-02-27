<template>
  <div class="home">
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
                      <b-form @submit.prevent="login">
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
                            type='password'
                            required
                            placeholder="Enter Your Password"
                          ></b-form-input>
                        </b-form-group>
                        <b-button class="btn-success" type="submit" variant="primary">Login</b-button>
                      </b-form>
                    </div>
                    <br>
                    <RegisterCost></RegisterCost>
                </div>
                <!-- <div class="card-footer">
                    <router-link to="/login/admin">are you admin</router-link>
                </div> -->
              <router-view/>
            </div>
        </div>
        <div class="col-sm"></div>
    </div>
</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import RegisterCost from '@/components/Register.vue'
export default {
  name: 'Home',
  data () {
    return {
      loginEmail: '',
      loginPass: ''
    }
  },
  components: {
    RegisterCost
  },
  methods: {
    login () {
      const costumer = {
        email: this.loginEmail,
        password: this.loginPass
      }
      // console.log(admin)
      this.$store.dispatch('loginCostumer', costumer)
    }
  }
}
</script>
