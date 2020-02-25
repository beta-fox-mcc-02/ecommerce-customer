<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark text-light" style="opacity: 0.9">
    <a class="navbar-brand" ><img src="../assets/Zeon_Emblem.png" alt="VueS" style="width: 30px"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
        </li>
        <!-- <li class="nav-item">
            <router-link to="/about">About</router-link>
        </li> -->
        <!-- <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
        <li>
            <router-link class="btn-warning btn text-dark" to="/login">Login</router-link>
        </li>
        <li>
            <button v-if='token' @click="logout" class="btn-danger">Logout</button>
        </li> -->
        </ul>
        <div class="text-right">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/cart"><i class="fas fa-cart-plus"></i></router-link>
            </li>
            <li class="nav-item active dropleft">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-cog"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link class="dropdown-item" to="/login"><i class="fas fa-sign-in-alt"></i> Login</router-link>
                  <button @click="logout" class="dropdown-item"><i class="fas fa-sign-out-alt"></i> Logout</button>
                  </div>
            </li>
          </ul>
        </div>
        <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
    </div>
  </nav>
</template>

<script>
import router from '../router'
export default {
  data () {
    return {
      token: this.checkToken()
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.checkToken()
      router.push('/')
    },
    checkToken () {
      if (localStorage.token) {
        this.token = true
      } else this.token = false
    }
  },
  created () {
    this.checkToken()
  }
}
</script>

<style>

</style>
