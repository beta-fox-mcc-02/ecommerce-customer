<template>
  <section id="buy-product">
    <div class="row">
      <div class="col s12">
        <div class="card horizontal">
          <div class="card-image">
            <img :src="product.image_url" alt="Product Image">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <ul>
                <li><h3>{{ product.name }}</h3></li>
                <li><h5>Price: {{ priceInRupiah }}</h5></li>
                <li><p>Stock: {{ product.stock }}</p></li>
              </ul>
              <div class="row">
                <div class="col s2">
                  <a
                    v-if="!addCart"
                    class="waves-effect waves-blue btn blue lighten-5 black-text"
                    @click.prevent="buy"
                  >Buy</a>
                  <a
                    v-if="addCart"
                    class="waves-effect waves-blue btn blue lighten-5 black-text"
                    @click.prevent="buy"
                  >Cancel</a>
                </div>
                <QuantityInput v-if="addCart" :max="product.stock" />
                <div class="col s5">
                  <a
                    v-if="addCart"
                    class="waves-effect waves-blue btn-large blue lighten-5 black-text"
                    @click.prevent=""
                  >
                  <i class="material-icons left">add_shopping_cart</i>Add to Cart</a>
                </div>
              </div>
            </div>
            <!-- <div class="card-action"> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import QuantityInput from './components/QuantityInput'
export default {
  name: 'BuyPage',
  data () {
    return {
      addCart: false
    }
  },
  components: {
    QuantityInput
  },
  methods: {
    buy () {
      this.addCart = !this.addCart
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },

    priceInRupiah () {
      return 'Rp ' + this.product.price.toLocaleString('id')
    }
  },
  created () {
    this.$store.dispatch('fetchOneProduct', this.$route.params)
  }
}
</script>

<style>
  ul {
    list-style: none;
  }
</style>
