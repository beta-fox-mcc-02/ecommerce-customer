<template>
  <div class="container">
    <div class="card" v-for="product in products" :key="product.id">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="product.image_url" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ product.name }}</p>
            <p class="subtitle is-6">{{ product.price }}</p>
          </div>
        </div>

        <div class="content">
          <div class="buttons">
            <button class="button is-outlined is-primary is-fullwidth">
              Details
            </button>
            <button
              class="button is-primary is-fullwidth"
              @click="addItem(product.id)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  created: function() {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  methods: {
    addItem: function(id) {
      const data = {
        ProductId: id,
        quantity: 1
      }
      this.$store
        .dispatch('addItem', data)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0.5em;
}

.card {
  height: max-content;
}
.card-image {
  margin: 25px;
}
</style>
