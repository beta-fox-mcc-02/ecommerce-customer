<template>
  <div id="show-product">
    <div id="product-container">
      <div class="product-card" v-for="item in product" v-bind:key="item.id">
        <div class="pcard-image">
          <img v-bind:src="item.imageUrl">
        </div>
        <div class="pcard-details">
          <h3> {{item.name.toUpperCase()}} </h3>
          <div class="cart-btn">
            <button v-on:click="checkout(item.id)">add to cart</button>
          </div>
          <div class="price-stock">
            <p>IDR {{item.price.toLocaleString()}}</p>
            <p>{{item.stock}} <i class="fas fa-box"></i></p>
          </div>
        </div>
      </div>
    </div>
    <router-view v-bind:product="product"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryId: '',
      product: []
    }
  },
  methods: {
    checkout (itemId) {
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.push(`/${this.categoryId}/${itemId}/checkout`)
      } else this.$router.push('/registration')
    }
  },
  watch: {
    $route () {
      this.categoryId = this.$route.params.id
      this.$store.dispatch('getProductAsync', this.categoryId)
        .then((result) => {
          this.product = result.data.data
        })
        .catch((err) => console.log(err))
    }
  },
  created () {
    this.categoryId = this.$route.params.id
    this.$store.dispatch('getProductAsync', this.categoryId)
      .then((result) => {
        this.product = result.data.data
      })
      .catch((err) => console.log(err))
    this.$store.dispatch('getBannersAsync')
  }
}
</script>

<style scoped>

div#show-product{
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
}

div#product-container {
    height: 75%;
    width: 70%;
    overflow-x: scroll;
    box-shadow: 0 0 0.5rem #bbbbbb;
    margin: 1%;
    display: flex;
}

.product-card {
    width: 15rem;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 0.5rem #c7c7c7;
}

.pcard-image {
    height: 55%;
    margin: 5%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pcard-details {
    height: 40%;
    width: inherit;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

img {
    max-width: 100%;
    max-height: 100%;
}

.price-stock {
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

p {
    margin: 0 1rem;
    font-size: 12pt;
    font-weight: bold;
}

button {
    width: 40%;
    font-style: italic;
}

</style>
