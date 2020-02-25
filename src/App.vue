<template>
  <fragment>
    <Preloader v-if="isLoadingAuthenticated"/>
    <div id="app" v-if="!isLoadingAuthenticated">
      <router-view/>
    </div>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Preloader from '@/components/Preloader.vue'
export default {
  name: 'App',
  components: {
    Fragment,
    Preloader
  },
  created () {
    this.$store.dispatch('checkAuthenticated')
      .then(response => {
        this.$store.commit('SET_AUTHENTICATED', true)
        this.$store.commit('SET_LOADING_AUTHENTICATION', false)
        this.$store.commit('SET_USER', response.data)
      })
      .catch((err) => {
        this.$store.commit('SET_AUTHENTICATED', false)
        this.$store.commit('SET_LOADING_AUTHENTICATION', false)
        this.$store.commit('SET_USER', {})
        this.$store.commit('SET_ERRORS', err.body)
      })
  },
  computed: {
    isLoadingAuthenticated () {
      return this.$store.state.isLoadingAuthenticated
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none !important;
}

.carousel-caption {
  top: 50%;
}
</style>
