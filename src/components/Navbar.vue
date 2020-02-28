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
      SINGKONGPEDIA
    </div>
    <v-spacer></v-spacer>
    <v-menu offset-y v-if="isLogin && route !== 'checkout'" :close-on-content-click="false">
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
                <th style="text-align: center;">Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="product in cartProducts" :key="product.id">
              <cart-list :product="product" />
            </tbody>
            <tfoot>
              <td style="text-align: right">Total :</td>
              <td style="text-align: left">Rp {{ totalPrice.toLocaleString('id') }}</td>
              <td></td>
              <td></td>
              <td><v-btn @click="checkout" small color="primary" class="ml-2">checkout</v-btn></td>
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
          <v-list-item-title>{{ email ? email : 'User' }}</v-list-item-title>
        </v-list-item>
        <hr>
        <v-list-item @click="list">
          <v-list-item-title>History</v-list-item-title>
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
    route () {
      return this.$route.name
    },
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
    totalPrice () {
      return this.cartProducts.reduce(function (a, b) {
        return a + (b.price * b.ProductTransaction.quantity)
      }, 0)
    },
    email () {
      return this.currentUser.email
    },
    cartProducts () {
      return this.currentUser.Transactions[0].Products
    }
  },
  components: {
    cartList
  },
  methods: {
    checkout () {
      this.$router.push('/checkout')
    },
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
  },
  watch: {
    $route (to, from) {
      console.log('ini route', this.$route)
    }
  }
}
</script>

<style scoped>
</style>
