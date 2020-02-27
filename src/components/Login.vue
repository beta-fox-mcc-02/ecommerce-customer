<template>
  <v-app id="loginForm">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ message }}
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Getting your data...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-content>
      <v-container
        fluid
        style="margin-top: 122px"
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
            <v-card class="elevation-12"
            >
              <v-toolbar
                color="teal"
                dark
                flat
              >
                <v-toolbar-title>Login Foot-Style</v-toolbar-title>

              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="email"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                    <v-card-actions>
                        <v-spacer />
                        <v-btn type="submit" color="success" :disabled="dialog">Login</v-btn>
                    </v-card-actions>
                </v-form>
                <v-card-actions>
                    <span>No account? Create account </span>
                    <v-btn text type="button" color="primary" link to="/register">here</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      snackbar: false,
      timeout: 3000,
      dialog: false,
      loading: false
    }
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    login () {
      this.loading = true
      this.dialog = true
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          if (data.data.role === 'user') {
            localStorage.user_token = data.data.access_token
            localStorage.id = data.data.id
            localStorage.name = data.data.name
            localStorage.email = data.data.email
            this.$store.commit('setLoginStatus', true)
            this.$router.push('/')
            this.loading = false
            this.dialog = false
            this.$emit('login')
          }
        })
        .catch(err => {
          this.loading = false
          this.dialog = false
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
        })
    }
  },
  created () {
    document.title = 'Login Foot-Style'
  }
}
</script>
