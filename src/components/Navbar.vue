<template>
  <v-app-bar
  app
  color="primary"
  dark
>
    <div @click="toHome" class="d-flex align-center pointer">
      <v-img
        alt="Nav-Shop Logo"
        class="shrink mr-2"
        contain
        src="../assets/nav-shop.png"
        transition="scale-transition"
        width="40"
      />

      <!-- <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      /> -->
      Singkongpedia
    </div>
    <v-spacer></v-spacer>
    <v-menu offset-y v-if="isLogin" :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-avatar class="pointer ophvr" v-on="on" size="48">
          <v-icon>mdi-cart-outline</v-icon>
        </v-avatar>
      </template>
      <v-list min-width="8rem" class="text-center" elevation="12">
        <!-- <center class="px-2" v-if="!cartProducts.length">No product in cart</center> -->
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image Product</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="product in cartProducts" :key="product.id">
              <cart-list :product="product" />
            </tbody>
            <tfoot>
              <div class="d-flex justify-end">
                <v-btn small color="primary" class="ml-2">checkout</v-btn>
              </div>
            </tfoot>
          </template>
        </v-simple-table>
        <!-- <div></div> -->
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="isLogin">
      <template v-slot:activator="{ on }">
        <v-avatar class="pointer ophvr" v-on="on" color="teal" size="48">
          <span class="white--text headline">{{ username ? username[0] : 'U'}}</span>
        </v-avatar>
      </template>
      <v-list min-width="8rem" class="text-center" elevation="12">
        <v-list-item @click="list">
          <v-list-item-title>{{ username ? username : 'User' }}</v-list-item-title>
        </v-list-item>
        <hr>
        <v-list-item @click="list">
          <v-list-item-title>History</v-list-item-title>
        </v-list-item>
        <v-list-item @click="list">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import cartList from './cartList'
export default {
  name: 'NafNavbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    products () {
      return this.$store.state.products
    },
    currentUser () {
      return this.$store.state.currentUser
    },
    username () {
      return this.currentUser.name
    },
    cartProducts () {
      return this.currentUser.Transactions[0].Products
    }
  },
  components: {
    cartList
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
      this.$store.commit('changeSignForm', true)
      this.$store.commit('setIsLogin', false)
    },
    list () {
      console.log('nge-list guys')
    },
    toHome () {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      setTimeout(() => {
        loader.hide()
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style>

</style>
