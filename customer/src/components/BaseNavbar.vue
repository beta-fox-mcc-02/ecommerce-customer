<template>
  <nav class="sticky-top">
    <div class="container">
      <div class="customer">
        <div class="row d-flex justify-content-around">
          <div class="col">
            <img src="../../public/logo.png" alt="Logo" class="w-25">
          </div>
          <div class="col">
            <router-link to="/" exact>Home</router-link>
          </div>
          <div class="col">
            <router-link to="/products">Products</router-link>
          </div>
          <div class="col">
            <router-link to="/cart"><i class="fa fa-shopping-cart">Cart</i></router-link>
          </div>
          <div class="col">
            <router-link to="/transaction">My Transaction</router-link>
          </div>
          <div class="col">
            <span
              v-if="!isLogin"
              class="dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Login
            </span>
            <span v-else @click="logout">Logout</span>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="cursor: text;">
              <div class="form-login">
                <form class="p-1 mt-3" @submit.prevent="login">
                  <input type="email" placeholder="Email" v-model="email">
                  <input type="password" placeholder="password" v-model="password">
                  <button type="submit" class="btn">Login</button>
                </form>
              </div>
              <div class="text-center">
                <p class="m-0">OR</p>
                <router-link class="mb-3" to="/register">Register Here</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BaseNavbar',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.email = ''
          this.password = ''
          localStorage.token = data.token
          this.$store.dispatch('isLogin', true)
          Toastify({
            text: 'Login Success',
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
          this.$router.push('/products').catch(_ => {})
        })
        .catch(_ => {
          Toastify({
            text: 'Login Failed',
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            className: 'info'
          }).showToast()
        })
    },
    logout () {
      localStorage.clear()
      this.$store.dispatch('isLogin', false)
      this.$router.push('/').catch(_ => {})
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('isLogin', true)
    }
  }
}
</script>

<style scoped>

.router-link-exact-active,
span:active {
  color: aqua ;
}

input,
button {
  margin: 5px;
}

.btn {
  background: #ff6601;
}
.btn:hover {
  background: #2bd609;
}

nav {
  background-color: #181818;
}
.col  {
  padding: 10px;
}

a,
.col,
p {
  font-weight: 700;
  cursor: pointer;
  color: white;
  text-decoration: none;
}

.dropdown-menu {
  background: #181818;
}

a:hover,
span:hover {
  color: aqua;
}

</style>
