<template>
  <v-container
    fluid
  >
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        top
    >
        {{ message }}
    </v-snackbar>
    <v-row>
        <v-col
        cols="12"
        md="5"
        >
            <v-img
                :src="shoe.image_url"
                height="400"
            ></v-img>
        </v-col>
        <v-col
            cols="12"
            md="7"
        >
            <v-card
                height="400"
            >
                <v-card-text
                class="pt-6"
                style="position: relative;"
                >
                <h3 class="display-1 font-weight-light orange--text mb-2">{{ shoe.name }}</h3>
                <v-divider></v-divider>
                <div class="font-weight-light title mb-2">
                    Description:
                </div>
                <div class="font-weight-light mb-1">
                    {{ shoe.description }}
                </div>
                <v-divider></v-divider>
                <div class="font-weight-light title mb-2">
                    Price: Rp. {{ shoe.price.toLocaleString() }}
                </div>
                <v-divider></v-divider>
                <div class="font-weight-light title mb-2">
                    Stock: {{ shoe.stock }}
                </div>

                <v-card-action>
                    <v-btn dark @click.prevent="addToCart">
                        <span>Add To Cart</span>
                        <v-icon right>mdi-cart-plus</v-icon>
                    </v-btn>
                </v-card-action>
            </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OneShoe',
  data () {
    return {
      shoe: {},
      snackbar: false,
      timeout: 3000
    }
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', this.$route.params.id)
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
    this.$store.dispatch('getOneShoe', this.$route.params.id)
      .then(({ data }) => {
        this.shoe = data.data
      })
      .catch(err => {
        this.$store.commit('setMessage', err.response.data.msg)
      })
  }
}
</script>

<style>

</style>
