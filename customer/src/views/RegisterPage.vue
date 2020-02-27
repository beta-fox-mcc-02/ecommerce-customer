<template>
  <div id="login">
    <div class="card" style="width: 30%;">
      <form class="p-3" @submit.prevent="register">
        <h4>Register Here</h4>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Username"
            v-model="username"
            required>
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
            required>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
            required>
        </div>
        <button type="submit" class="btn">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data)
          this.username = ''
          this.email = ''
          this.password = ''
          Toastify({
            text: 'Register Success',
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
          this.$router.push('/')
        })
        .catch(_ => {
          Toastify({
            text: 'Register Failed',
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.token) {
      next()
    } else {
      next('/')
    }
  }
}
</script>

<style scoped>

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #181818e5;
}

</style>
