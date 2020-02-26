<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark indigo">
        <a class="navbar-brand" href="#"><strong>Navbar</strong></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/home"><a class="nav-link" href="#">Home</a></router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/products"><a class="nav-link" href="#">Products</a></router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Profile</a>
                </li>
            </ul>
            <button><Register/></button>
            <button><Login/></button>
        </div>
    </nav>
</template>

<script>
import Register from '../components/Register'
import Login from '../components/Login'

export default {
  name: 'Navbar',
  components: {
    Register,
    Login
  },
  methods: {
  }
}
</script>

<style>

</style>
