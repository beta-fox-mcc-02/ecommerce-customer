<template>
  <nav class="navbar navbar-expand-md navbar-light" style="background-color: #03A9F4;">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/">
            <img src="../assets/logo.png" alt />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mx-auto order-0">
      <router-link to="/">Ikan</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".dual-collapse2"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2" style="align-item: center;">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" @click.prevent="pindah('shop')">
          <!-- <router-link to="/shop">Shop</router-link> -->
          <a class="nav-link" href="#">Shop</a>
        </li>
        <li class="nav-item" @click.prevent="pindah('login')" v-if="!isLogin">
          <a class="nav-link" href="#">login</a>
        </li>
        <li class="nav-item" @click.prevent="pindah('cart')" v-if="isLogin">
          <a class="nav-link" href="#">Cart</a>
        </li>
        <li class="nav-item" @click.prevent="signout" v-if="isLogin">
          <a class="nav-link" href="#">signout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods:{
    pindah(page){
      // console.log(page);
      this.$router.push(`/${page}`)
    },
    signout(){
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/')
    }
  }, 
  computed:{
    isLogin(){
      return this.$store.state.isLogin
    }
  },
    created: function(){
    if(localStorage.token){
      // this.$store.commit('SET_LOGIN', true)
    }
  }
};
</script>

<style  scoped>
a {
  color: black;
}
.navbar {
  background-color: transparent;
  z-index: 5;
}

nav.scroll {
  background-color: #a1572f;
  color: #eef;
}
</style>