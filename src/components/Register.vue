<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent='register' style="margin-right: 10px">
        <v-text-field
          label="Name"
          name="name"
          type="text"
          prepend-icon="mdi-face"
          v-model="name"
        />
        <v-text-field
          label="Email"
          name="email"
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
        <Alert v-if="getMessage" />
        <v-card-actions>
          <v-flex justify-center style="margin-bottom: 15px">
            <v-btn type="submit" color="primary">Register</v-btn>
          </v-flex>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  components: {
    Alert
  },
  methods: {
    register () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        RoleId: 1
      }
      // console.log('masuk method')
      this.$store.dispatch('register', payload)
        .then(({ data }) => {
          // console.log(data, 'REGISTERING')
          localStorage.access_token = data.access_token
          this.$store.commit('SET_ISLOGIN', true)
          this.$store.commit('SET_USER', { user: { id: data.data.id, name: data.data.name } })
          this.$store.commit('SET_MESSAGE', { msg: data.msg, status: true })
          this.$router.push('/products')
        })
        .catch(err => {
          // console.log(err.response)
          if (err.response.data.msg.length !== 0) {
            const newMsg = []
            err.response.data.msg.forEach((error, i) => {
              newMsg.push(error.message)
            })
            // console.log(newMsg)
            this.$store.commit('SET_MESSAGE', { msg: newMsg.join('  ||  '), status: false })
          } else {
            this.$store.commit('SET_MESSAGE', { msg: err.response.data.msg, status: false })
          }
        })
    }
  },
  computed: {
    getMessage () {
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
