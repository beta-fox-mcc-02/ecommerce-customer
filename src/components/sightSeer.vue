<template>
  <div class="menu">
    <div id="register">
      <a v-on:click="registerPage">register</a>
    </div>
    <div id="login">
      <a v-on:click="loginPage">login</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    registerPage () {
      this.$router.push('/registration')
    },
    loginPage () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.menu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    height: inherit;
    width: 10rem;
}

div#register, div#login {
    height: inherit;
    align-items: center;
    display: flex;
    width: 50%;
}

a {
    height: inherit;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 15pt;
}

a:hover {
  background-color: rgb(12, 78, 12);
}

</style>
