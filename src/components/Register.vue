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
                :loading="loading"
            >
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register Foot-Style</v-toolbar-title>

              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="person"
                    type="text"
                    v-model="name"
                  />

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
                        <v-btn type="submit" color="primary" :disabled="dialog">Register</v-btn>
                    </v-card-actions>
                </v-form>
                <v-card-actions>
                    <span>Back To Login </span>
                    <v-btn text type="button" color="success" link to="/login">here</v-btn>
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
      name: '',
      email: '',
      password: '',
      snackbar: false,
      timeout: 3000,
      loading: false,
      dialog: false
    }
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    register () {
      this.loading = true
      this.dialog = true
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          if (data.data.role === 'user') {
            this.$router.push('/login')
            this.loading = false
            this.dialog = false
          }
        })
        .catch(err => {
          this.$store.commit('setMessage', err.response.data.msg)
          this.snackbar = true
          this.loading = false
          this.dialog = false
        })
    }
  },
  created () {
    document.title = 'Register Foot-Style'
  }
}
</script>
