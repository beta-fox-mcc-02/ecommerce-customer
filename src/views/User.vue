<template>
  <div>
    <LoginForm v-if="isHaveAccount" @ubahForm="changeForm" />
    <RegisterForm v-if="!isHaveAccount" @ubahForm="changeForm" />
  </div>
</template>

<script>
import LoginForm from '../components/Login'
import RegisterForm from '../components/Register'

export default {
  data () {
    return {
      isHaveAccount: true
    }
  },
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    changeForm (status) {
      this.isHaveAccount = status
    }
  }
}
</script>

<style>

</style>
