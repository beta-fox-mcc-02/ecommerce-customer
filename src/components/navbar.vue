<template>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
    <v-toolbar-title>
        <v-btn @click="home">
        NaoVVibu
        </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn text icon style="margin-right: 40px"
        @click="fetch"
    >
    <v-badge
    :content="increment"
    :value="increment"
    color="purple"
    overlap
    >
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
        <v-icon>
        mdi-shopping
        </v-icon></v-btn>
      </template>
      <span>Checkout</span>
    </v-tooltip>
    </v-badge>
    </v-btn>
    <v-btn @click.prevent="logout" v-if="token">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
        <v-icon>
        mdi-logout-variant
        </v-icon></v-btn>
      </template>
      <span>logout</span>
    </v-tooltip>
    </v-btn>
    <v-btn @click="login" v-else-if="!token">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
        <v-icon>
        mdi-login-variant
        </v-icon></v-btn>
      </template>
      <span>login</span>
    </v-tooltip>
    </v-btn>
    </v-app-bar>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    checkout () {
      this.$router.push('/checkout')
    },
    fetch () {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/Cart/user',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.commit('itemsCart', data)
          this.$router.push('/checkout')
        })
        .catch(err => {
          this.text = err
        })
    },
    logout () {
      localStorage.removeItem('token')
    },
    login () {
      this.$router.push('/login')
    },
    home () {
      this.$router.push('/')
    }
  },
  computed: {
    increment () {
      return this.$store.state.cartNotif
    },
    token () {
      return localStorage.token
    }
  }
}
</script>

<style>

</style>
