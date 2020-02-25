<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="toProductPage">
          <v-list-item-action>
            <v-icon>fas fa-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toCartPage" v-if="hasLogin">
          <v-list-item-action>
            <v-icon>fas fa-shopping-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>My Cart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Toko Murah</v-toolbar-title>
      <div class="ml-auto d-inline-flex">
        <div class="text-center" v-if="!hasLogin">
          <v-menu transition="fade-transition" min-width="200px">
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on" color="white" text icon>
                <v-icon>fas fa-user</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="toRegisterPage">
                <v-list-item-title class="register">Register</v-list-item-title>
              </v-list-item>
              <v-list-item @click="toLoginPage">
                <v-list-item-title class="login">Login</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-toolbar-title v-if="hasLogin" class="logout">
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-toolbar-title>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer color="teal" app class="justify-center">
      <span class="white--text">&copy; 2020 - Ulrich Wake</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
    toRegisterPage() {
      this.$router.push('/register');
    },
    toLoginPage() {
      this.$router.push('/login');
    },
    toProductPage() {
      this.$router.push('/');
    },
    toCartPage() {
      this.$router.push('/cart');
    }
  },
  computed: {
    hasLogin() {
      return false;
    }
  }
}
</script>

<style>
.register:hover,
.login:hover,
.logout:hover {
  cursor: pointer;
}
</style>
