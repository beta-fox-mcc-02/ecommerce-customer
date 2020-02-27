<template>
  <div class="form-login-container">
    <form class="form-login" @submit.prevent="login">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      </div>
      <div class="form-label-group">
        <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputEmail">Email address</label>
      </div>
      <div class="form-label-group">
        <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <label for="inputPassword">Password</label>
      </div>
      <div class="dont-have-account mb-3">
        <label>
          <p>Don't have an account ?</p>
        </label>
        <router-link class="btn btn-link" to="/register" tag="a">Register</router-link>
      </div>
      <button v-if="!isLoading" class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
       <b-button v-if="isLoading" variant="primary" class="btn-lg btn-block" disabled>
        <b-spinner big type="grow"></b-spinner>
        Loading...
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          localStorage.token = response.data.token
          this.$store.dispatch('findUser')
            .then(response => {
              this.$store.commit('SET_USER', response.data)
              this.$store.commit('SET_LOADING', false)
              this.$store.commit('SET_AUTHENTICATED', true)
              this.$router.push('/')
            })
            .catch((err) => {
              this.$store.commit('SET_ERRORS', err.response)
              this.$store.commit('SET_LOADING', false)
              this.$store.commit('SET_AUTHENTICATED', false)
            })
        })
        .catch(err => {
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_MESSAGE', err.response)
          this.$store.commit('SET_AUTHENTICATED', false)
        })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>

  .dont-have-account {
    display: flex;
    justify-content: space-between;
  }

  .form-login {
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
