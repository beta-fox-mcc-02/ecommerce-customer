<template>
  <fragment>
     <Carousel/>
      <b-container>
        <div class="special-deals">
          <h2>Our Special Deals</h2>
          <b-row class="special-deals-products">
            <Product :product="product" v-for="product in products" :key="product.id"/>
          </b-row>
        </div>
        <div class="features">
          <b-row class="flex-center">
            <b-col md="7" class="features-text-right">
              <h2 class="text-left heading">Our SKF collection products</h2>
              <p class="lead">
                SKF flanged ball bearing units consist of an insert bearing mounted in a housing, which can be bolted to a machine wall or frame.
                The SKF assortment includes units compliant with ISO standards, North American standards, or Japanese Industrial Standards (JIS).
                Within the SKF assortment, you can find units for nearly all requirements regarding bolt patterns or locking on the shaft.
              </p>
            </b-col>
            <b-col md="5">
              <img class="img-fluid w-100 d-block" src="../assets/images/collections.png"/>
            </b-col>
          </b-row>
        </div>
        <div class="features">
          <b-row class="flex-center">
            <b-col md="5">
              <img class="img fluid w-100 d-block" src="../assets/images/boat.png" />
            </b-col>
            <b-col md="7" class="features-text-left">
              <h2 class="text-left heading">Our Engine Boats</h2>
              <p class="lead">
                More than just an engine, we’re a solutions partner for your brand and customers.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Carousel from '@/components/Carousel.vue'
import Product from '@/components/Product.vue'
export default {
  name: 'Homepage',
  components: {
    Fragment,
    Carousel,
    Product
  },
  created () {
    this.$store.dispatch('getBestDealProduct', 3)
      .then(response => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('SET_PRODUCTS', response.data.products)
      })
      .catch(err => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('SET_ERRORS', err.response)
      })
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style lang="scss" scoped>
  .special-deals {
    margin-top: 20px;
  }

  .features {
    &-text-right {
      padding-right: 3rem;
    }
    &-text-left {
      padding-left: 3rem;
    }
  }

  .flex-center {
    align-items: center;
    justify-content: center;
  }

  .lead {
    text-align: justify
  }

  .text-left {
    text-align: left
  }

  .heading {
    font-weight: 400
  }
</style>
