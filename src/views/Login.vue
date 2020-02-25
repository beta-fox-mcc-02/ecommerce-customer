<template>
  <section id="login">
    <div class="form-container">
      <div class="form-header">
        <h1>Login Form</h1>
        <p v-if="notification">{{ message }}</p>
        <p v-else>Please fill in the form below</p>
      </div>
      <form v-on:submit.prevent="login">
        <div class="inputs">
          <input type="email" placeholder="email" v-model="email" required>
          <small>required</small>
        </div>
        <div class="inputs">
          <input type="password" placeholder="password" v-model="password" required>
          <small>required</small>
        </div>
        <button type="submit">login</button>
      </form>
      <div class="form-footer">
        already a member? <a v-on:click="redirect">register</a> instead
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      notification: false,
      message: ''
    }
  },
  computed: {
    email: {
      get () { return this.$store.state.email },
      set (value) { this.$store.commit('setEmail', value) }
    },
    password: {
      get () { return this.$store.state.password },
      set (value) { this.$store.commit('setPassword', value) }
    }
  },
  methods: {
    redirect () {
      this.$router.push('/registration')
    },
    login () {
      this.$store.dispatch('loginAsync')
        .then((result) => {
          this.clear()
          localStorage.setItem('token', result.data.token)
          this.$store.commit('setLoginStatus', true)
          this.$store.commit('setUsername', result.data.username)
          this.$router.push('/')
        })
        .catch(() => {
          this.clear()
          this.notification = true
          this.message = 'Input email or password invalid'
        })
    },
    clear () {
      this.$store.commit('clearAll')
    }
  }
}
</script>

<style scoped>

section#login {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    width: 40%;
    min-width: 25rem;
    height: 75%;
    min-height: 30rem;
    box-shadow: 0 0 1rem #cecece;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.form-header, .form-footer {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.form-header {
    background-color: #4b698e;
    color: white;
    flex-direction: column;
    justify-content: space-evenly;
}

form {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.inputs {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 0.01rem solid #bfbfbf;
    width: 60%;
    height: 2.5rem;
}

input[type="text"], input[type="email"], input[type="password"] {
    outline: 0;
    border-style: none;
    font-size: 16pt;
    font-style: italic;
    padding: 0 0.2rem
}

a {
    margin: 0 0.5rem;
    font-weight: bold;
}

a:hover {
  font-size: 20pt
}

small {
    color: #e0e0e0;
}

button {
    width: 30%;
    height: 2.5rem;
    font-size: 20pt;
}

</style>
