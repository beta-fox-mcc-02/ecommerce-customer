<template>
  <div class="home">
    <Navbar />
    <main v-if="!showParticularProduct">
      <section id="banner">
        <img src="https://www.kindpng.com/picc/m/465-4653741_e-commerce-banner-ecommerce-web-development-services-hd.png" alt="">
      </section>
      <section class="categories">
        <div class="category-cards" v-for="category in categories" v-bind:key="category.id">
          <div class="category-intro">
            <h1> {{category.name}} </h1>
          </div>
          <div class="category-products">
            <button v-on:click="seeProducts(category.id)">Products</button>
          </div>
        </div>
      </section>
    </main>
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  data () {
    return {
      product: [],
      showParticularProduct: false
    }
  },
  components: { Navbar },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    seeProducts (categoryId) {
      this.$router.push(`/${categoryId}`)
    }
  }
}
</script>

<style scoped>

.home {
    height: 90vh;
    width: 100vw;
}

main {
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

section#banner {
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

section.categories {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 85%;
    height: 45%;
    margin-bottom: 1rem;
}

.category-cards {
    height: 75%;
    width: 20%;
    margin: 0 0.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 0.5rem #9c9c9c;
}

.category-intro {
    width: 90%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    border-bottom: 0.01rem solid #cccbcb;
}

.category-products {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
}

img {
    height: 100%;
    box-shadow: 0 0 1rem grey;
}

button {
    width: 60%;
    font-size: 15pt;
    background-color: #9a1f1f;
    color: white;
    border: 0.2rem ridge white;
    box-shadow: 0 0 0.1rem black;
}

button:hover{
  background-color: #752626;
}

</style>
