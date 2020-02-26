<template>
   <div class="row">
    <div class="col s6 offset-s3">
      <div class="card z-depth-3">
        <div class="card-content center white-text blue-grey darken-4">
          <span class="card-title">Registration</span>
          <form id="regis-form" @submit.prevent="register">
            <!-- username -->
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">account_box</i>
                <input class="validate white-text" id="username" type="text" required v-model="username">
                <label for="username">Username</label>
              </div>
            </div>
            <!-- email -->
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">email</i>
                <input class="validate white-text" id="email" type="email" required v-model="email">
                <label for="username">Email</label>
              </div>
            </div>
            <!-- password -->
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">security</i>
                <input class="validate white-text" id="password" type="password" required v-model="password">
                <label for="password">Password</label>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center">
                <button class="waves-effect waves-blue btn blue lighten-5 black-text" type="submit" name="action">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      console.log(payload)
      this.$store.dispatch('register', payload)
        .then(({ data }) => {
          M.toast({ html: `${data.message}` })
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.username = ''
          this.email = ''
          this.password = ''
          M.toast({
            html: `${err}`,
            classes: 'red'
          })
        })
    }
  }
}
</script>

<style scoped>
  button{
    width: 15rem
  }
</style>
