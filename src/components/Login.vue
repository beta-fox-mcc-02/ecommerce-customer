<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent='login' style="margin-right: 10px">
        <v-text-field
          label="Email"
          name="login"
          type="email"
          prepend-icon="mdi-email"
          v-model="email"
        />
        <v-text-field
          id="password"
          label="Password"
          name="password"
          type="password"
          prepend-icon="mdi-lock"
          v-model="password"
        />
        <Alert v-if="alertMessage" />
        <v-card-actions>
          <v-flex justify-center style="margin-bottom: 15px">
            <v-btn type="submit" color="primary">Login</v-btn>
          </v-flex>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Alert from '@/components/Alert.vue'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Alert
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          localStorage.access_token = data.access_token
          this.$store.commit('SET_ISLOGIN', true)
          this.$store.commit('SET_USER', { user: { id: data.data.id, name: data.data.name, email: data.data.email } })
          this.$store.commit('SET_MESSAGE', { msg: data.msg, status: true })
          console.log(data, 'LOGIN')
          this.$router.push('/products')
        })
        .catch(err => {
          // console.log(err.response)
          // console.log(err.response.data.msg)
          this.$store.commit('SET_MESSAGE', { msg: err.response.data.msg, status: false })
        })
    }
  },
  computed: {
    alertMessage () {
      return this.$store.state.message
    }
  },
  created () {
    this.$store.commit('SET_MESSAGE', { msg: '', status: null })
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style>

</style>
