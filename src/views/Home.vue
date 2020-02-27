<template>
  <div class="home">
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary
    >
      <v-list>
        <div class="loggedUserAction" v-show="isLogin">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            to="/cart"
          >
            <v-list-item-icon>
              <v-badge
                :content="cart.length"
                :value="cart.length"
                color="purple"
                overlap
              >
                <v-icon>shopping_cart</v-icon>
              </v-badge>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Cart</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-icon>
                <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div class="noUserAction" v-show="!isLogin">
          <v-list-item
            link
            to="/login"
          >
            <v-list-item-icon>
                <v-icon>fas fa-user-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Sign Up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            to="/register"
          >
            <v-list-item-icon>
                <v-icon>fas fa-sign-in-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          link
          :to="menu.route"
        >
            <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- App Bar Photo by Edgar Chaparro on Unsplash -->
    <v-app-bar
      app
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      prominent
      src="../img/edgar-chaparro-Lh-CTP558tc-unsplash.jpg"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"
        class="d-lg-none d-xl-flex"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Foot-Style</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-row
        justify="center"
        no-gutters
        class="d-none d-lg-flex d-xl-none"
      >
        <v-btn
          v-for="(menu, i) in menus"
          :key="i"
          color="white"
          text
          rounded
          link
          :to="menu.route"
          class="my-2"
        >
          {{ menu.name }}
        </v-btn>
      </v-row>

      <v-spacer></v-spacer>

      <v-row
        justify="end"
        no-gutters
        class="d-none d-lg-flex d-xl-none"
      >
        <div class="noUserAction" v-show="!isLogin">
          <v-btn text link to="/register">
            <span>Sign Up</span>
            <v-icon right>fas fa-user-plus</v-icon>
          </v-btn>
          <v-btn text link to="/login">
            <span>Sign In</span>
            <v-icon right>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </div>
        <div class="loggedUserAction" v-show="isLogin">
          <v-btn icon link to="/cart">
            <v-badge
              :content="cart.length"
              :value="cart.length"
              color="purple"
              overlap
            >
              <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon>
            <v-icon>fas fa-user-circle</v-icon>
          </v-btn>
          <v-btn icon @click="logout">
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="639"
    >
      <v-container
        fluid
      >
        <router-view
          @login="login"
        ></router-view>
      </v-container>
      <v-footer
        dark
        padless
      >
        <v-card
          flat
          tile
          class="indigo lighten-1 white--text text-center"
        >

          <v-card-text class="white--text pt-0">
            <v-row>
                <v-col
                cols="12"
                md="4"
                class="text-left"
                >
                <v-card-text>
                  <v-card-title class="title">
                    Adress
                  </v-card-title>
                  <div>
                    Jl. Panji Wangko no. 8 Kekalik Indah
                    Kel. Kekalik Jaya, Kec. Sekarbela
                    Mataram, NTB, Indonesia
                    kodepos 83115
                  </div>
                </v-card-text>
                </v-col>
                <v-col
                cols="12"
                md="4"
                class="text-center"
                >
                <v-card-text>
                  <v-card-title class="title">
                    Our Contact
                  </v-card-title>
                  <v-btn
                    v-for="icon in contactIcons"
                    :key="icon"
                    class="mx-4 white--text"
                    icon
                  >
                    <v-icon size="24px">{{ icon }}</v-icon>
                  </v-btn>
                </v-card-text>
                </v-col>
                <v-col
                cols="12"
                md="4"
                class="text-right"
                >
                <v-card-text>
                  <v-card-title class="title text-right">
                    Other Contact
                  </v-card-title>
                  <v-card-subtitle>
                    <v-icon left>call</v-icon>
                    <span>+62-810-5495-9866</span>
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <v-icon left>email</v-icon>
                    <span>foot-style@hotmail.com</span>
                  </v-card-subtitle>
                </v-card-text>
                </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            &copy; {{ new Date().getFullYear() }} — <strong>Foot-Style</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      drawer: null,
      isLogin: false,
      name: localStorage.name,
      email: localStorage.email
    }
  },
  computed: {
    contactIcons () {
      return this.$store.state.contactIcons
    },
    menus () {
      return this.$store.state.menus
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    login () {
      this.isLogin = true
      document.title = 'Foot-Style'
    },
    logout () {
      this.$store.commit('setLoginStatus', false)
      localStorage.clear()
      this.isLogin = false
      this.$router.push('/')
    },
    fetchCartData () {
      this.$store.dispatch('getCartData')
    }
  },
  created () {
    document.title = 'Foot-Style'
    if (localStorage.user_token) {
      this.$store.dispatch('getCartData')
      this.isLogin = true
    }
  }
}
</script>
