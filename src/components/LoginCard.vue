<template>
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <div class="row center">
            <div class="col s4 offset-s4">
              <div class="card blue darken-2">
                <div class="card-content white-text">
                  <div class="col s1 offset-s11">
                    <a id="close" @click.prevent="loginTrigger" class="disabled grey-text"><i class="material-icons">close</i></a>
                  </div>
                  <span class="card-title">LOGIN</span>
                    <!-- FORM -->
                    <div class="row">
                      <form class="col s12" @submit.prevent="login">
                        <!-- user -->
                        <div class="row">
                          <div class="input-field col s12">
                            <input id="user" type="text" class="validate" required v-model="user">
                            <label for="user" class="white-text">Username</label>
                          </div>
                        </div>
                        <!-- password -->
                        <div class="row">
                          <div class="input-field col s12">
                            <input id="password" type="password" class="validate" required v-model="password">
                            <label for="password" class="white-text">Password</label>
                          </div>
                        </div>
                        <button type="submit" class="waves-effect waves-blue btn blue lighten-5 black-text">Login</button>
                      </form>
                      </div>
                      <!-- register link -->
                      <div class="row">
                        <div class="col s12 center">
                          <p>Make an account! <a href="#" @click.prevent="toRegistration">Register Here!</a></p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'LoginCard',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    loginTrigger () {
      this.$store.commit('loginTrigger')
    },
    toRegistration () {
      this.loginTrigger()
      this.$router.push('/register')
    },
    login () {
      const payload = {
        user: this.user,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          localStorage.token = data.token
          localStorage.username = data.username
          this.$store.commit('SUCCESS', { message: `Login successful! Welcome ${data.username}!` })
          this.$store.commit('LOGIN_CHECK')
          this.loginTrigger()
        })
        .catch(err => {
          let message = ''
          if (err.status === 500) message = err
          else message = 'Wrong username / email / password'
          M.toast({
            html: `${message}`,
            displayLength: 3000,
            classes: 'red'
          })
          this.user = ''
          this.password = ''
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  width: 20rem
}
p {
  font-size: 15pt
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
transition: opacity 0.5s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100rem;
  margin: 0px auto;
}

#close {
  cursor: pointer;
}
</style>
