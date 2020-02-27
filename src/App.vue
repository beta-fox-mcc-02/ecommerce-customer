<template>
  <v-app id="bg-none">
    <n-navbar />
    <notifications group="sign" position="top left" :width="600"/>
      <v-content style="margin-bottom: 4rem">
        <router-view></router-view>
      </v-content>
    <v-card>
      <v-footer
        absolute
        class="font-weight-medium primary text-center white--text"
      >
        <v-col
          class="text-center pointer"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Singkongpedia</strong>
        </v-col>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import nNavbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    nNavbar
  },
  methods: {
    checkLogin () {
      if (localStorage.token) {
        this.$store.commit('setIsLogin', true)
      } else {
        this.$store.commit('setIsLogin', false)
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style>
  .pointer {
    cursor: pointer;
  }
  .hvr {
    transition: transform 10s
  }
  .hvr:active {
    background-color: blue;
  }
  .ophvr {
    transition: opacity .4s ease-in-out;
  }
  .ophvr:hover {

    opacity: 0.6;
  }
  /* .ovl-hd {
    overflow: auto;
  } */
  #bg-none {
    background: none;
  }
  body {
    background-image: url("https://missnyingnying.files.wordpress.com/2011/02/img_95671.jpg");
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
