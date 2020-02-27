<template>
  <v-container fluid>
        <h1 class="font-weight-black">
        </h1>
    <v-row>
      <v-col cols="6" sm="4" md="3" v-for="item in items" :key="item.id">
      <v-hover
        v-slot:default="{ hover }"
        close-delay="200"
      >
      <v-card
        :elevation="hover ? 16 : 2"
        >
            <v-img
                :src="item.image_url"
                height="300"
            ></v-img>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="handline">{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.category.name}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
              absolute
              color="orange"
              class="white--text"
              fab
              small
              right
              top
              @click="addCart(item.id)"
              >
              <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-list-item>
            <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-spacer>
              stock: {{item.stock}}
            </v-spacer>
              <v-spacer>
                  price : Rp.{{item.price}}
              </v-spacer>
            </v-card-text>
        </v-card>
      </v-hover>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
        top
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      snackbar: false,
      text: ''
    }
  },
  methods: {
    view () {
      this.$router.push('/checkout')
    },
    addCart (id) {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/addCart',
        method: 'post',
        data: {
          id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini')
          this.$store.commit('addCart', data)
          this.$router.push('/login')
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    }
  },
  computed: {
    items () {
      return this.$store.state.items
    }
  },
  created () {
    this.$store.dispatch('fecthData', localStorage.getItem('id'))
  }
}
</script>

<style>

</style>
