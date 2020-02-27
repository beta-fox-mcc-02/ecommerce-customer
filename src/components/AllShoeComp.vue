<template>
  <div
  >
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        top
    >
        {{ message }}
    </v-snackbar>
    <v-toolbar
        color="primary"
        dark
    >
        <v-toolbar-title>Shoes</v-toolbar-title>

        <v-divider
        class="mx-4"
        inset
        vertical
        ></v-divider>

        <v-text-field
        v-model="search"
        label="Search Shoe"
        prepend-inner-icon="search"
        solo-inverted
        hide-details
        cols="3"
        ></v-text-field>
    </v-toolbar>
    <v-row>
        <v-col
            v-for="{id, name, image_url, price, Categories} in shoes"
            :key="id"
            cols="12"
            sm="12"
            md="6"
            lg="3"
        >
            <v-card>
            <v-img
                :src="image_url"
                class="align-end"
                height="200"
            >
            </v-img>
            <v-card-title
                v-text="name"
                class="d-block text-truncate"
            ></v-card-title>
            <v-card-text
                class="text--primary"
            >
                <div class="price">
                Price: Rp. {{ price.toLocaleString() }}
                </div>
                <v-chip-group
                column
                >
                    <v-chip
                        v-for="category in Categories"
                        :key="category.id"
                    >
                        {{category.name}}
                    </v-chip>
                </v-chip-group>
            </v-card-text>
            <v-card-action>
                <v-btn text link :to="`/shoes/${id}`">
                    <span>Details</span>
                    <v-icon right>fas fa-info-circle</v-icon>
                </v-btn>
                <v-btn text @click.prevent="addToCart(id)">
                    <span>Add To Cart</span>
                    <v-icon right>mdi-cart-plus</v-icon>
                </v-btn>
            </v-card-action>
            </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AllShoes',
  data () {
    return {
      snackbar: false,
      search: ''
    }
  },
  computed: {
    shoes () {
      return this.$store.state.products.filter((el) => {
        return el.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
        .then(({ data }) => {
          this.$store.dispatch('getCartData')
          this.$store.commit('setMessage', data.msg)
          this.snackbar = true
        })
        .catch(err => {
          if (localStorage.user_token) {
            this.$store.commit('setMessage', err.response.data.msg)
            this.snackbar = true
          } else {
            this.$router.push('/login')
          }
        })
    }
  },
  created () {
    document.title = 'Shoes - Foot-Style'
    this.$store.dispatch('fetchShoes')
  }
}
</script>

<style scoped>
v-card-action {
    display: flex;
    justify-content: space-around;
}
</style>
