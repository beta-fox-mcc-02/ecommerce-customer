<template>
    <b-container class="d-flex m-2 p-2 flex-wrap">
        <div
        v-for="product in products"
        :key="product.id"
        >
            <b-card
                v-bind:title="product.name"
                v-bind:src="product.image_url"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 "
            >
                <b-card-text>Rp {{product.price}}</b-card-text>
                <b-card-text>Stock : {{product.stock}}</b-card-text>
                <b-button @click="addCart(product.id)" class="m-1" variant="primary">Add Cart</b-button>
                <b-button class="m-1" to="/1" variant="primary">View Detail</b-button>
            </b-card>
        </div>
    </b-container>
</template>

<script>
export default {
  name: 'ListProduct',
  methods: {
    detail () {
      this.$router.push('/1')
    },
    addCart (id) {
      this.$store.dispatch('addCart', id, this.costumerId)
        .then(addedCart => {
          console.log('masukk')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
      .then(({ data }) => {
        this.$store.commit('FETCH_PRODUCT', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    products () {
      return this.$store.state.products.data
    },
    costumerId () {
      return this.$store.state.costumerId
    }
  }
}
</script>

<style>

</style>
