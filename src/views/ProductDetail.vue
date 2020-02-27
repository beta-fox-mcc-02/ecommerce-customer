<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="product.image_url" alt="Placeholder image" />
            </figure>
          </div>

          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ product.name }}</p>
                <p class="subtitle is-6">{{ formatIDR(product.price) }}</p>
              </div>
            </div>
            <div class="content">
              <p class="subtitle is-6">Tersisa: {{ product.stock }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="section">
          <h1 class="title">{{ product.name }}</h1>
          <p class="subtitle is-6">{{ formatIDR(product.price) }}</p>
          <div class="buttons">
            <button class="button is-primary" @click="addItem(product.id)">
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
  name: 'ProductDetail',
  created: function() {
    this.$store.dispatch('getProduct', this.$route.params.id)
  },
  computed: {
    product() {
      return this.$store.state.product
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
    },
    formatIDR: function(money) {
      if (money) {
        let reverse = money
          .toString()
          .split('')
          .reverse()
          .join('')
        let ribuan = reverse.match(/\d{1,3}/g)
        ribuan = ribuan
          .join('.')
          .split('')
          .reverse()
          .join('')
        return 'Rp. ' + ribuan
      }
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
  padding-top: 25px;
}
</style>
