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
    <v-menu offset-y v-if="isLogin">
      <template v-slot:activator="{ on }">
        <v-avatar class="pointer ophvr" v-on="on" size="48">
          <v-icon>mdi-cart-outline</v-icon>
        </v-avatar>
      </template>
      <v-list min-width="8rem" class="text-center" elevation="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image Product</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>
                  {{ product.id }}
                </td>
                <td>
                  <!-- <v-avatar tile> -->
                    <img :src="product.image" width="50" alt="avatar" srcset="">
                  <!-- </v-avatar> -->
                </td>
                <td>
                  {{ product.name }}
                </td>
                <td>{{ product.stock }} pcs</td>
                <td>Rp {{ product.price }}</td>
                <td>{{ product.description }}</td>
                <td>
                  <!-- <v-icon class="pointer mx-1 hvr" small>mdi-pencil</v-icon> -->
                  <dialog-update class="my-2" :product="product"></dialog-update>
                  <dialog-delete class="my-2" :product="product"></dialog-delete>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="isLogin">
      <template v-slot:activator="{ on }">
        <v-avatar class="pointer ophvr" v-on="on" color="teal" size="48">
          <span class="white--text headline">U</span>
        </v-avatar>
      </template>
      <v-list min-width="8rem" class="text-center" elevation="12">
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
export default {
  name: 'NafNavbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    products () {
      return this.$store.state.products
    }
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
