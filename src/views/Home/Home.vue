<template>
  <div class="home">
    <div id="banner" class="row">
      <div class="col s12">
        <img  alt="CE8 logo" src="../../assets/android-chrome-192x192.png">
      </div>
    </div>
    <div class="row">
      <Categories />
      <router-view />
    </div>
  </div>
</template>

<script>
import Categories from './components/Categories'
export default {
  name: 'Home',
  components: {
    Categories
  }
}
</script>

<style scoped>
  #banner {
    background-color: #263238
  }
</style>
