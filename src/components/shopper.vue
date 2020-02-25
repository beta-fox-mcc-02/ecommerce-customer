<template>
  <div class="menu">
    <div id="user-profile">
      <a class="far fa-user-circle"></a>
      <span>
        <div id="user-profile-detail">
          <h1>HELLO</h1>
          <p style="font-style: italic">{{ username }}</p>
        </div>
        <button id="logout" v-on:click="logout">logout</button>
      </span>
    </div>
    <div id="shopping-cart">
      <a class="fas fa-shopping-cart"></a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  methods: {
    logout () {
      this.$store.commit('clearAll')
      // tambah commit clear satu lagi jika "username" masih ada
      localStorage.clear()
    }
  }
}
</script>

<style scoped>

div {
    height: inherit;
}

.menu{
    display: flex;
    align-items: center;
}

a.far.fa-user-circle, a.fas.fa-shopping-cart {
    font-size: 20pt;
    height: inherit;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
}

a:hover{
  background-color: #374d69
}

div#user-profile {
    position: relative;
}

div#user-profile:hover span {
    visibility: visible;
}

span {
    position: absolute;
    top: 3rem;
    left: -2.5rem;
    padding: 1rem;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 7rem;
}

div#user-profile-detail {
    height: 65%;
    text-align: center;
}

button#logout {
    text-align: center;
    height: 35%;
    font-size: 12pt;
    background-color: #a6d5fa;
    border-style: groove;
    border-radius: 0.2rem;
    color: #6d6d6d;
}

button#logout:hover {
  background-color: #8baec9
}

</style>
