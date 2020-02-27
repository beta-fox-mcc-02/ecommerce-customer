<template>
  <div id="app">
    <header>
      <h1 class="mb-0">G R S - S T O R E</h1>
    </header>
    <BaseNavbar/>
    <router-view class="view"/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseNavbar from './components/BaseNavbar'
import BaseFooter from './components/BaseFooter'
export default {
  name: 'App',
  components: {
    BaseNavbar,
    BaseFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background: #000;
}

header {
  background: #212121;
}

.view {
  min-height: 100vh;
}

.box-view {
  text-align: left;
  background: #181818;
}

.head {
  border-bottom: white solid 2px;
}
.btn {
  background: #ff6601;
}

.btn:hover {
  background: #2bd609;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.9);
  cursor: pointer;
}
</style>
