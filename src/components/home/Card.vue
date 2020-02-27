<template>
  <div class="home_card">
    <div class="x" v-for="{ id, name, author, image_url, price, stock } in product" :key="id" >
      <div class="card">
        <div class="card-image">
          <figure class="image is-20x19">
            <img
              :src="image_url"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{name}}</p>
              <p class="subtitle is-6">@{{author}}</p>
              <p class="title is-6"><strong>Rp. {{price.toLocaleString()}}</strong></p>
              <p class="subtitle is-6" v-if="stock > 10">stock > 10</p>
              <p class="subtitle is-6" v-else-if="stock < 5">stock less than 5</p>
              <p class="subtitle is-6" v-else>stock less than 10</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <Cart :id="id" :price="price" :stock="stock" :name="name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from './AddCart.vue'
export default {
  name: 'Home_Card_Cust',
  data () {
    return {
      stock: ''
    }
  },
  methods: {
  },
  computed: {
    product () {
      return this.$store.state.list
    }
  },
  components: {
    Cart
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style>
</style>
