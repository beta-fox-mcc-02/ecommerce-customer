<template>
  <div class="border rounded product-card-container" v-if="products.length">
    <div class="card card-container" v-for="product in products" :key="product.id">
      <div class="p-2 add-cart-container" @click="addCartForm(product.id)">
        <i class="fas fa-shopping-basket"></i>
      </div>
      <img :src="product.image_url" class="card-image">
      <div class="card-body">
        <div class="card-title product-name">{{ product.name }}</div>
        <div class="card-text product-desc">
          <p>Rp {{ product.price.toLocaleString('id-ID') }}.00</p>
          <p>available: {{ product.stock }} items</p>
        </div>
      </div>
      <AddCart v-if="showAddCartForm && ProductId === product.id"/>
    </div>
  </div>
</template>

<script>
import AddCart from '../components/AddCart'

export default {
  name: 'Product',
  data () {
    return {
      ProductId: null
    }
  },
  components: {
    AddCart
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    showAddCartForm () {
      return this.$store.state.addCartFormShow
    }
  },
  methods: {
    addCartForm (productId) {
      if (localStorage.getItem('token')) {
        this.$store.commit('SET_ADD_CART_FORM_SHOW', true)
        this.$store.commit('SET_PRODUCT_ID_FOR_ADD_CART', productId)
        this.ProductId = productId
      } else {
        this.$router.push(({ name: 'SignIn' }))
      }
    }
  }
}
</script>

<style scoped>
.product-card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-container {
  width: 20%;
  margin: 20px;
}

.card-image{
  height: 200px;
}

.product-name {
  font-weight: bold;
}

.product-desc {
  display: flex;
  flex-direction: column;
}

.add-cart-container {
  width: max-content;
  height: max-content;
  font-size: 3rem;
  position: absolute;
  color: rgb(207, 207, 207);
}

.add-cart-container:hover {
  color: #2c3e50;
  cursor: pointer;
}
</style>
