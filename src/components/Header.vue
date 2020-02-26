<template>
  <div class="border-bottom header-container">
    <div class="logo-container">
      LOGO
    </div>
    <div class="nav-container">
      <div class="px-2 cart-area">
        <i class="fas fa-shopping-basket btn-2" v-if="currentPage !== 'Cart'" @click="toCart"></i>
      </div>
      <div class="border-left px-2 signIn-area">
        <router-link to="/signIn" class="anchor">
          <i class="fas fa-sign-in-alt btn-2" v-if="!isLogin"></i>
        </router-link>
        <i class="fas fa-sign-out-alt btn-2" v-if="isLogin"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    currentPage () {
      return this.$store.state.currentPage
    }
  },
  methods: {
    toCart () {
      this.$store.commit('SET_CURRENT_PAGE', 'Cart')
    }
  }
}
</script>

<style>
.logo-container {
  font-family: 'Passion One';
  font-size: 2.5rem;
}

.header-container {
  /* background-color: black; */
  height: 50px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.nav-container {
  display: flex;
  font-size: 2rem;
}
</style>
