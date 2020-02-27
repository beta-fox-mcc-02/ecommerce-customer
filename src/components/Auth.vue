<template>
  <v-app id="inspire">
    <v-content>
      <v-btn class="ml-5 mx-2 mt-5" fab dark small color="green" to="/">
        <v-icon>fas fa-store</v-icon>
      </v-btn>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert type="error" class="container" max-width="800" v-if="error">{{error}}</v-alert>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{action}}</v-toolbar-title>
                <v-progress-circular
                  :size="50"
                  color="amber"
                  indeterminate
                  class="ml-auto"
                  v-if="loading"
                ></v-progress-circular>
              </v-toolbar>
              <v-form @submit.prevent="submitForm">
                <v-card-text>
                  <v-text-field
                    required
                    label="Email"
                    name="login"
                    prepend-icon="fas fa-user"
                    type="email"
                    v-model="email"
                  />
                  <v-text-field
                    required
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="fas fa-lock"
                    type="password"
                    v-model="password"
                  />
                </v-card-text>

                <v-container fluid>
                  <v-btn color="primary" type="submit" style="margin-left:70%;">{{action}}</v-btn>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
          <v-container>
            <div style="margin-left:40%;" in-line v-if="action=='Login'" class="d-inline-flex">
              <div class="mr-2">Don't have an account?</div>
              <router-link @click.prevent="hideError" to="/register">
                <i class="fa fa-user"></i>
                Register
              </router-link>
            </div>
            <div style="margin-left:40%;" in-line v-if="action=='Register'" class="d-inline-flex">
              <div class="mr-2">Already have an account?</div>
              <router-link @click.prevent="hideError" to="/login">
                <i class="fa fa-user"></i>
                Login
              </router-link>
            </div>
          </v-container>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  props: {
    action: String
  },
  methods: {
    submitForm() {
      this.loading = true
      let data = {
        email: this.email,
        password: this.password
      }
      if (this.action === 'Register') {
        data.role = 'user'
        this.$store.dispatch('register', data)
          .then(({ data }) => {
            localStorage.setItem('token', data.access_token)
            this.loading = false
            this.error = ''
            this.$router.push('/')
          })
          .catch(err => {
            if (err.response.data.error) {
              this.error = err.response.data.error
            } else if (err.response.data.errors) {
              this.error = err.response.data.errors[0]
            }
            this.loading = false
          })
      } else if (this.action === 'Login') {
        this.$store.dispatch('login', data)
          .then(({ data }) => {
            localStorage.setItem('token', data.access_token)
            this.error = ''
            this.loading = false
            this.$router.push('/')
          })
          .catch(err => {
            if (err.response.data.error) {
              this.error = err.response.data.error
            } else if (err.response.data.errors) {
              this.error = err.response.data.errors[0]
            }
            this.loading = false
          })
      }
    },
    hideError() {
      this.$store.commit('showError', '')
    }
  }
}
</script>

<style>
.v-application .primary {
  background-color: #7f7f7f !important;
  border-color: #7f7f7f !important;
  color: #fec442 !important;
}
</style>
