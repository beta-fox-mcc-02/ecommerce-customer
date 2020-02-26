<template>
  <div id="navbar">
    <div class="left-bar">
      <h2>TITLE</h2>
      <ul>
        <li @click="moveHome">Home</li>
        <li @click="moveProducts">Product</li>
      </ul>
    </div>
    <div class="right-bar">
      <div class="chart">
        <ul>
          <li>Chart</li>
        </ul>
      </div>
      <div class="logout">
        <ul>
          <li @click="logoutProcess">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      admin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    moveProducts () {
      this.$router.push('/customer/products')
    },
    moveHome () {
      this.$router.push('/customer')
    },
    logoutProcess () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style>
* {
  margin : 0;
}

#navbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: black;
  height: 8vh;
  /* position: fixed; */
}

/* LEFT NAVBAR */

#navbar .left-bar{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}

#navbar .left-bar ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
}

#navbar .left-bar ul li{
  padding-left: 20px;
}

/* RIGHT NAVBAR  */

#navbar .right-bar{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

#navbar .right-bar .chart ul, #navbar .right-bar .login ul, #navbar .right-bar .logout ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin-right: 20px;
}

#navbar .right-bar .login ul li {
  padding-right: 20px;
}
#navbar .right-bar .login ul li a:hover {
  color: blue;
}

li, h2 {
  color: white;
}

#navbar .right-bar .chart ul li, #navbar .right-bar .login ul li, #navbar .right-bar .logout ul li, #navbar .left-bar ul li {
  cursor: pointer;
  margin-top: 10px;
  color: white;
}

.linker {
  color: white;
}

#title-login-admin {
  color: black;
}

#cancel-login-admin {
  width: 50%;
  margin: 0 auto;
}

#submit-login-admin {
  width: 90%;
}

#login-admin {
  background-color: rgb(29, 43, 38);
}
</style>
