<template>
    <div>
      <nav class="navbar navbar-expand-md p-0 shadow">
        <div class="collapse navbar-collapse d-md-flex justify-content-center" id="trigger">
          <ul class="navbar-nav">
            <li class="navbar-item mx-5">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="navbar-item mx-5">
              <router-link to="/store" class="nav-link">Store</router-link>
            </li>
            <li class="navbar-item mx-5">
              <router-link to="/mycart" class="nav-link">My Cart</router-link>
            <li class="navbar-item mx-5">
              <router-link to="/history" class="nav-link">Purchase History</router-link>
            </li>
            </li>
            <li class="navbar-item mx-5">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: `NavbarCustomer`
};
</script>

<style scoped>

.navbar {
  background-color: black;
}

.navbar-nav {
  padding: 4;
}

.nav-link {
  color: white;
  text-transform: uppercase;
  font-family: "Playfair Display SC", sans-serif;
  font-size: 15px;
}

.nav-link:hover {
  /* opacity: 0.8; */
  color: rgb(235, 17, 53);
}
</style>