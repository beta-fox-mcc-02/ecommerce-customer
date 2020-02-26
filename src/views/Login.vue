<template>
  <div class="mt-12 d-flex justify-center">
    <v-card shaped width="500" :loading="loadingForm">
      <v-card-title>
        {{ isLoginPage ? 'Login Here' : 'Register Here'}}
      </v-card-title>
      <v-card-subtitle>
        {{ navigationMsg }} <a href="#" @click="changeForm(isLoginPage)">{{ isLoginPage ? 'Register' : 'Login' }}</a>
      </v-card-subtitle>
      <v-card-text>
        <form-login />
      </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import formLogin from '../components/FormSign'
export default {
  name: 'Sign',
  methods: {
    changeForm (status) {
      console.log('login kepencet')
      this.$store.commit('changeSignForm', !status)
    }
  },
  components: {
    formLogin
  },
  computed: {
    isLoginPage () {
      return this.$store.state.isLoginPage
    },
    navigationMsg () {
      if (!this.isLoginPage) {
        return 'Have account Singkongpedia?'
      } else {
        return 'Don\'t have an account?'
      }
    },
    loadingForm () {
      return this.$store.state.loadingForm
    }
  }
}
</script>

<style scoped>
  .fullport {
    height: 90vh;
  }
</style>
