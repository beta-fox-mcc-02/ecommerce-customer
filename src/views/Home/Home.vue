<template>
  <div class="home">
    <div id="banner" class="row">
      <div class="col s12">
        <img  alt="CE8 logo" src="../../assets/android-chrome-192x192.png">
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
// import CategoryButton from './components/CategoryButton'
export default {
  name: 'Home',
  components: {
    // CategoryButton
  }
}
</script>

<style scoped>
  #banner {
    background-color: #263238
  }
</style>
