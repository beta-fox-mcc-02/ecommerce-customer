<template>
  <div>
    <Navbar></Navbar>
    <div class="message-response">
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="variant"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>{{myMessage}}</p>
      </b-alert>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Dashboard',
  components: {
    Navbar
  },
  data () {
    return {
      dismissSecs: 0,
      dismissCountDown: 0,
      myMessage: '',
      variant: ''
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.token) {
      next()
    } else {
      next('/')
    }
  },
  computed: {
    successMessage () {
      console.log(this.$store.state.successMessage, '>>>>>>>>>> COMPUTED')
      return this.$store.state.successMessage
    },
    products () {
      return this.$store.state.products
    }
  },
  watch: {
    successMessage: function (val) {
      console.log('WATCH')
      if (this.$store.state.successMessage !== '') {
        this.dismissSecs = 5
        this.variant = 'success'
        this.myMessage = this.$store.state.successMessage
        this.showAlert()
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style>

</style>
