<template>
  <div id="app">
    <div class="navbar">
      <div>
        <img @click.prevent="toHome" src="https://i.pinimg.com/originals/d9/12/09/d91209340bdc005936c46323a62caaff.png" style="width: 50px; height: 50px;">
      </div>
      <div id="nav-right">
        <div v-if="checkLogin">
          <a href="" @click.prevent="toCart"><i class="fas fa-cart-plus" style="font-size: 25px; color: red"></i></a>
        </div>
        <!-- <div v-if="checkLogin">
          <a href=""><i class="fas fa-user-circle" style="font-size: 25px; color: red"></i></a>
        </div> -->
        <div v-if="checkLogin">
          <button @click.prevent="toLogout" type="submit" class="btn btn-danger">LOGOUT</button>
        </div>
        <div v-if="!checkLogin" class="account">
          <button @click.prevent="toLogin" type="submit" class="btn btn-danger">LOGIN</button>
        </div>
        <div v-if="!checkLogin">
          <button @click.prevent="toRegister" type="submit" class="btn btn-danger">REGISTER</button>
        </div>
      </div>
    </div>
    <ButtonCategory/>
    <router-view class="router" style=""/>
  </div>
</template>

<script>
import ButtonCategory from './components/ButtonCategory'

export default {
  components: {
    ButtonCategory
  },
  computed: {
    checkLogin () {
      return this.$store.state.isLogedIn
    }
  },
  methods: {
    toRegister () {
      this.$router.push({ path: '/register' })
    },
    toLogin () {
      console.log('masuukkkk')
      this.$router.push({ path: '/login' })
    },
    toLogout () {
      localStorage.clear()
      this.$vToastify.success('logout success')
      this.$store.commit('FETCH_ISLOGEDIN', false)
      this.$router.push({ path: '/' })
    },
    toCart () {
      this.$router.push({ path: '/cart' })
    },
    toHome () {
      this.$router.push({ path: '/' })
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('FETCH_ISLOGEDIN', true)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  padding: 30px;
  height: 70px;
  width: 100%;
  top: 0;
  color: red;
  position: fixed !important;
  background-color: black;
  display: flex;
  justify-content: flex-start
}
.fas {
  padding: 0px 50px;
}
#nav-right {
  display: flex;
}
.navbar div {
  cursor: pointer;
}
.navbar .account {
  padding: 0 20px;
}
</style>
