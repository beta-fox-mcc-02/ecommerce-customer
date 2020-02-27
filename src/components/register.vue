<template>
    <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    v-model="email"
                    prepend-icon="mdi-email"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    name="password"
                    prepend-icon="mdi-textbox-password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
                <div class="text-center">
                    <v-btn depressed color="primary" @click="register">Register</v-btn>
                </div>
                <v-card-subtitle class="text-center">
                <br>
                <div class="register">
                    Already have account? <a @click="login">login here here</a>
                </div>
                </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      top
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
        top
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      snackbar: false,
      text: ''
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    register () {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/register',
        data: {
          email: this.email,
          password: this.password
        },
        method: 'POST'
      })
        .then(({ data }) => {
          this.snackbar = true
          this.text = 'register succses'
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    }
  }
}
</script>

<style>

</style>
