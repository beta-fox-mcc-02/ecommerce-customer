<template>
  <div class="form-register-container">
    <form class="form-register" @submit.prevent="register">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      </div>
      <b-alert v-if="errors.length" show variant="danger">
        <div style="margin-bottom:10px;" v-for="(err, index) of errors" :key="index">
          {{ err }}
        </div>
      </b-alert>
      <div class="form-label-group">
        <input type="text" v-model="firstname" id="inputFirstname" class="form-control" placeholder="Firstname" required="" autofocus="">
        <label for="inputFirstname">Firstname</label>
      </div>
      <div class="form-label-group">
        <input type="text" v-model="lastname" id="inputLastname" class="form-control" placeholder="Lastname" autofocus="">
        <label for="inputLastname">Lastname</label>
      </div>
      <div class="form-label-group">
        <input type="text" v-model="username" id="inputUsername" class="form-control" placeholder="Username" required autofocus="">
        <label for="inputUsername">Username</label>
      </div>
      <div class="form-label-group">
        <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputEmail">Email address</label>
      </div>
      <div class="form-label-group">
        <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <label for="inputPassword">Password</label>
      </div>
      <div class="have-account mb-3">
        <label>
          <p>Already have an account ?</p>
        </label>
        <router-link class="btn btn-link" to="/login" tag="a">Login</router-link>
      </div>
      <button v-if="!isLoading" class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <b-button v-if="isLoading" variant="primary" class="btn-lg btn-block" disabled>
        <b-spinner big type="grow"></b-spinner>
        Loading...
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        first_name: this.firstname,
        last_name: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_ERRORS', [])
          this.$store.commit('SET_MESSAGE', 'Register Success')
          this.$router.push('/login')
        })
        .catch(err => {
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_ERRORS', err.response.data.errors)
          this.$store.commit('SET_MESSAGE', '')
        })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    errors () {
      return this.$store.state.errors
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('checkAuthenticated')
        .then(response => {
          vm.$store.commit('SET_AUTHENTICATED', true)
          vm.$store.commit('SET_LOADING_AUTHENTICATION', false)
          vm.$store.commit('SET_USER', response.data)
          vm.$router.push('/')
        })
        .catch((err) => {
          vm.$store.commit('SET_AUTHENTICATED', false)
          vm.$store.commit('SET_LOADING_AUTHENTICATION', false)
          vm.$store.commit('SET_USER', {})
          vm.$store.commit('SET_ERRORS', err.response)
          next()
        })
    })
  }
}
</script>

<style lang="scss" scoped>

  .have-account {
    display: flex;
    justify-content: space-between;
  }

 .form-register {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: auto;
    &-container {
      display: flex;
      align-items: center;
      height: 100%;
      background-color: #f5f5f5;
    }
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: #495057;
    pointer-events: none;
    cursor: text;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group > input, .form-label-group > label {
    height: 3.125rem;
    padding: .75rem;
  }

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}

label {
  p {
    padding-top: 0.375rem;
  }
}
</style>
