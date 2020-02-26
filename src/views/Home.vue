<template>
  <div class="home container">
    <!-- <div class="my-2 d-flex justify-end">
      <v-btn @click="toDetailProduct" color="primary" dark>
        <v-icon left>mdi-plus-thick</v-icon>Detail Produk
      </v-btn>
    </div> -->
    <v-card>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="product in products"
            :key="product.id"
            :cols="3"
          >
            <v-card class="pointer">
              <v-img
                :src="product.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              ></v-img>
              <v-card-title v-text="product.name"></v-card-title>
              <v-card-text>Rp {{ product.price.toLocaleString('id') }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import dialogDelete from '../components/PromptDelete'
// import dialogUpdate from '../components/PromptUpdate'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    // dialogDelete,
    // dialogUpdate
  },
  methods: {
    toDetailProduct () {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      setTimeout(() => {
        loader.hide()
        this.$router.push('/detailProduct')
      }, 1000)
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    headers () {
      const headers = []
      Object.keys(this.products[0]).forEach(product => {
        headers.push({
          text: (product.toLowerCase().split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1)))),
          value: product
        })
      })
      return headers
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>
