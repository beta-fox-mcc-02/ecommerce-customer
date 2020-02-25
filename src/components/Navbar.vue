<template>
  <div>
    <b-navbar toggleable="lg"
    type="light"
    variant="light">
      <b-navbar-brand>E-Commerce</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click.prevent="clickHome">Home</b-nav-item>
          <b-nav-item href="" disabled>Categories</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <b-nav-item
          v-if="!isLogin"
          @click.prevent="clickLogin">
          Sign In
          </b-nav-item>
          <b-nav-item-dropdown left v-if="isLogin">
            <template v-slot:button-content>
              <i class="fa fa-shopping-cart"></i>
            </template>
            <b-dropdown-text>Empty Cart</b-dropdown-text>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              {{ userEmail }}
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item
            @click.prevent="logout()">
            Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  props: {
    userEmail: String,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    clickLogin() {
      this.$router.push('/login');
    },
    clickHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .b-dropdown-text{
    margin: 0
  }
</style>
