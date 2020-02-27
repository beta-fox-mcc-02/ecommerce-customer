<template>
  <v-row
    align="center"
    justify="center">
    <v-form
      ref="form"
      style="width: 500px"
    >
      <div v-if="!showPass">
        <Alert v-if="getMessage" />
        <v-text-field
          v-model="name"
          :counter="10"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          style="margin-bottom: 15px"
          required
        ></v-text-field>

        <v-flex
        justify-center
        style="margin-bottom: 15px">
          <v-btn
            color="success"
            style="margin-right: 10px"
            @click.prevent="updateUser">
            Submit
          </v-btn>
        </v-flex>
      </div>

      <div v-else>
        <Alert v-if="getMessage" />
        <v-text-field
          v-model="oldPassword"
          label="Verify Password"
          style="margin-top: 10px"
          required
        ></v-text-field>

        <v-text-field
          v-model="newPassword"
          label="New Password"
          required
        ></v-text-field>

        <v-flex
          justify-center
          style="margin-bottom: 15px">
          <v-btn
            color="success"
            @click.prevent="changePassword">
            submit
          </v-btn>
        </v-flex>
      </div>

      <v-flex
        justify-center
        style="margin-bottom: 15px">
        <v-btn
          color="warning"
          @click.prevent="showChangePassword">
          Edit {{ !showPass ? 'Password' : 'User' }}
        </v-btn>
      </v-flex>

    </v-form>
  </v-row>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  data () {
    return {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      showPass: false
    }
  },
  components: {
    Alert
  },
  methods: {
    showChangePassword () {
      this.showPass = !this.showPass
      this.$store.commit('SET_MESSAGE', { msg: '', status: false })
    },
    fetchUser () {
      this.$store.dispatch('fetchUser', localStorage.access_token)
        .then(({ data }) => {
          this.name = data.data.name
          this.email = data.data.email
          this.$store.commit('SET_USER', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    changePassword () {

    },
    updateUser () {
      const payload = {
        id: this.$store.state.user.id,
        name: this.name,
        email: this.email
      }
      this.$store.dispatch('updateUser', payload)
    }
  },
  computed: {
    getUser () {
      return this.$store.state.user
    },
    getMessage () {
      return this.$store.state.message
    }
  },
  created () {
    this.fetchUser()
    // this.$store.commit('SET_MESSAGE', { msg: '', status: null })
    // console.log(this.$store.state.user)
  },
  beforeRouteEnter (from, to, next) {
    if (localStorage.access_token) {
      next()
    } else {
      next('/users/login')
    }
  }
}
</script>

<style>

</style>
