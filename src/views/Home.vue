<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>fas fa-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>fas fa-shopping-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Menu</v-toolbar-title>
      <div class="ml-auto d-inline-flex">
        <div class="text-center" v-if="notLogin">
          <v-menu transition="fade-transition">
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on" color="white" text icon>
                <v-icon>fas fa-user</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title class="register" @click="toRegisterPage">Register</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="login" @click="toLoginPage">Login</v-list-item-title>
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

    <v-footer color="indigo" app class="justify-center">
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
    }
  },
  computed: {
    hasLogin() {
      return false;
    },
    notLogin() {
      return true;
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
