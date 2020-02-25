<template>
  <v-card class="d-inline-block mx-auto"
    width="300"
    style="margin-bottom: 150px; box-shadow: 1px 1px 5px 8px rgba(0,0,0,0.15);"
  >
    <v-container>
        <v-col cols="auto">
          <v-img
            height="200"
            width="200"
            :src="image"
            shaped
          ></v-img>
        </v-col>
        <v-col
          cols="auto"
          class="text-center pl-0"
        >
          <v-row
            class="flex-row ma-0 fill-height"
            justify="center"
          >
            <v-col class="px-0">
              <v-btn @click.prevent="substract" icon>
                <v-icon>mdi-minus-circle</v-icon>
              </v-btn>
            </v-col>
            <v-col class="px-0">
              <v-btn icon>
                <v-icon>{{ getQty }}</v-icon>
              </v-btn>
            </v-col>
            <v-col class="px-0">
              <v-btn @click.prevent="add" icon>
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-card-text class="text-center">
            <b>{{ product.name }}</b>
          </v-card-text>
          <v-row>
            <v-col>
              <v-card-text style="display:flex; align-items:center; justify-content: space-between">
                <div>
                  {{ getProductPrice }}
                </div>
                <v-btn @click.prevent="addToCart" icon color="primary">
                  <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      image: this.product.image_url,
      qty: 0
    }
  },
  props: ['product'],
  methods: {
    add () {
      this.qty++
    },
    substract () {
      this.qty--
    },
    resetQty () {
      this.qty = 0
    },
    addToCart () {
      console.log(this.product.id, this.product.name, this.qty)
    }
  },
  computed: {
    getProductPrice () {
      return 'Rp ' + (+this.product.price).toLocaleString('id-ID')
    },
    getQty () {
      if (this.qty <= 0) {
        this.resetQty()
      }
      return this.qty
    }
  },
  created () {
    // console.log(this.qty)
  }
}
</script>
