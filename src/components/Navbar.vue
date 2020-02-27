<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/">
        <b-navbar-brand>Marine Diesel</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="navbar-flex">
          <b-nav-form style="visibility:hidden;">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <li class="btn-link">
              <router-link class="btn-cart" to="/cart" tag="div">
                <a><i class="fa fa-shopping-cart fa-5" aria-hidden="true"></i></a>
              </router-link>
              <router-link
                  tag="div" to="/login"
                  v-if="!isAuthenticated">
                <a class="btn color-white btn-outline-primary">Login</a>
              </router-link>
              <b-nav-item-dropdown v-if="isAuthenticated" right>
                <template v-slot:button-content>
                  <em>{{ user.username }}</em>
                </template>
                <b-dropdown-item @click="goToProfile">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout" href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    goToProfile () {
      this.$router.push('/profile')
    },
    logout () {
      this.$store.dispatch('logout')
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    background-color: #212529 !important;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    &-flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .btn-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fa-shopping-cart {
    padding-right: 20px;
    font-size: 30px !important;
    color: #fff
  }

  .btn-outline-primary {
    color: #fff !important;
    border-color: #fff !important;
    &:hover {
      background-color: #fff;
      color: #212529 !important;
    }
  }
</style>
