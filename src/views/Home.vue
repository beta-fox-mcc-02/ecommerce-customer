<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="side-q">
      <v-list dense>
        <v-list-item link :to="'/'">
          <v-list-item-action>
            <v-icon>fas fa-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/cart'" v-if="isLogin">
          <v-list-item-action>
            <v-icon>fas fa-shopping-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/history'" v-if="isLogin">
          <v-list-item-action>
            <v-icon>fas fa-receipt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>History Transaction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="navbar-q">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>G-watch</v-toolbar-title>
      <v-menu transition="scroll-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="white" class="ma-2 ml-auto" v-on="on" text icon>
            <v-icon class="mr-2 btn-navbar">fas fa-user</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link :to="'/login'" v-if="!isLogin">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="'/register'" v-if="!isLogin">
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
          <v-list-item link @click.prevent="logout" v-if="isLogin">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    // source: String,
  },
  data: () => ({
    drawer: null,
    isLogin: false,
  }),
  methods: {
    logout() {
      this.isLogin = false
      localStorage.clear()
      this.$router.push('/login')
    },
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true
    }
  }
}
</script>
<style>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #7f7f7f !important;
  color: #fec442 !important;
}
.btn-navbar {
  color: #fec442 !important;
}

.side-q {
  background-color: #fec442 !important;
  color: #7f7f7f !important;
}
</style>
