<template>
  <div id="NavbarG">
    <header>
      <div class="container-fluid">
        <h1
          class="text-center mt-0 pt-0 shadow"
          style="font-family: 'Playfair Display SC', serif; font-weight: normal; font-size: 90px"
        >G<span style="font-family: 'serif'; font-size: 20px">&</span>N</h1>
        <nav class="navbar navbar-expand-md p-0 shadow">
          <div class="collapse navbar-collapse d-md-flex justify-content-center" id="trigger">
            <ul class="navbar-nav">
              <li class="navbar-item mx-1">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/" class="nav-link">Store</router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/" class="nav-link" v-if="!adminStatus">My Cart</router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/about" class="nav-link">About</router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/login" class="nav-link" v-if="!loginStatus">Login</router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/admin" class="nav-link" v-if="adminStatus">Dashboard</router-link>
              </li>
              <li class="navbar-item mx-1">
                <p @click="logout" class="nav-link" v-if="loginStatus" style="cursor:pointer">Logout</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: `Navbar`,
  data() {
    return {
      loginStatus: false,
      adminStatus: false
    };
  },
  methods: {
    logout() {
      console.log(`ke hit`);
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      this.loginStatus = false;
      this.adminStatus = false;
      Toastify({
        text: "Logout successfully, See you!",
        backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
        className: "info"
      }).showToast();
    }
  },
  computed: {
    
  },
  created() {
    if (localStorage.token) {
      this.loginStatus = true;
    }
    if (localStorage.isAdmin) {
      this.adminStatus = localStorage.getItem("isAdmin");
    }
  }
};
</script>

<style scoped>
header {
  justify-content: center;
  display: flex;
  height: 150px;
  align-items: center;
  text-align: center;
}

h1 {
  color: white;
}

h1:hover {
  color: rgb(233, 32, 65);
  cursor: pointer;
}

.navbar {
  background-color: transparent;
}

.navbar-toggler i {
  color: whitesmoke;
  font-size: 20px;
}

.navbar-nav {
  padding: 4;
}

.nav-link {
  color: white;
  text-transform: uppercase;
  font-family: "Playfair Display SC", sans-serif;
  font-size: 18px;
}

.nav-link:hover {
  /* opacity: 0.8; */
  color: rgb(235, 17, 53);
}
</style>