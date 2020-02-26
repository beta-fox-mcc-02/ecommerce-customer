<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-if="!isLoginPage"
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-text-field
      v-if="!isLoginPage"
      v-model="passwordConfirm"
      :rules="passwordConfirmRule"
      label="Re-type Password"
      type="password"
      required
    ></v-text-field>

    <v-checkbox
      v-if="!isLoginPage"
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      v-if="!isLoginPage"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="Register"
    >
      Register
    </v-btn>
    <v-btn
      v-if="isLoginPage"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="Login"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [v => (v && v.length >= 6) || 'Password must be more than 6 characters'],
      checkbox: false,
      passwordConfirm: '',
      passwordConfirmRule: [v => (v === this.password) || 'Password doesn\'t match']
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    emptyForm () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.passwordConfirm = ''
    },
    Register () {
      this.$store.commit('runLoading', true)
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data)
          this.signSuccess(data)
        })
        .catch(({ response }) => {
          console.log(response)
          this.$store.commit('runLoading', false)
          this.$notify({
            group: 'sign',
            title: 'Sign Failed',
            text: response.data.msg,
            type: 'error'
          })
        })
    },
    Login () {
      this.$store.commit('runLoading', true)
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data)
          this.signSuccess(data)
        })
        .catch(({ response }) => {
          console.log(response)
          this.$store.commit('runLoading', false)
          this.$notify({
            group: 'sign',
            title: 'Sign Failed',
            text: response.data.msg,
            type: 'error'
          })
        })
    },
    signSuccess (data) {
      this.$store.commit('runLoading', false)
      this.emptyForm()
      localStorage.token = data.token
      this.$store.commit('addCurrentUser', data)
      this.$store.commit('setIsLogin', true)
      this.$router.push('/')
    }
  },
  computed: {
    isLoginPage () {
      return this.$store.state.isLoginPage
    }
  }
}
</script>
