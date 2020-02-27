<template>
  <b-container>
    <div class="products">
      <h2>Our Products</h2>
      <b-row>
        <b-col sm="3">
          <Categories />
        </b-col>
        <b-col sm="9">
          <b-row>
            <b-col md="4" v-for="product in products" :key="product.id">
              <Product :isHomePage="false" :product="product" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Categories from '@/components/Categories.vue'
import Product from '@/components/Product.vue'
export default {
  name: 'Products',
  components: {
    Categories,
    Product
  },
  methods: {
    fetchProducts (params) {
      if (!params) {
        this.$store.dispatch('fetchProducts')
          .then(response => {
            this.$store.commit('SET_PRODUCTS', response.data.products)
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('SET_ERRORS', [])
          })
          .catch(err => {
            this.$store.commit('SET_ERRORS', err.response)
            this.$store.commit('SET_LOADING', false)
          })
      } else {
        this.$store.dispatch('fetchProducts', this.$route.params.category)
          .then(response => {
            this.$store.commit('SET_PRODUCTS', response.data.products)
            this.$store.commit('SET_LOADING', false)
          })
          .catch(err => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('SET_ERRORS', err.response)
          })
      }
    }
  },
  created () {
    this.fetchProducts(this.$route.params.category)
  },
  watch: {
    $route (to, from) {
      this.fetchProducts(to.params.category)
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    padding-top: 20px;

    h2 {
      text-align: center
    }
  }
</style>
