<template>
<v-container>
    <v-simple-table style="margin-top:60px">
    <template
    >
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th class="text-center">Image</th>
          <th class="text-center">Name</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Subtotal</th>
          <th class="text-center">Cancel</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td class="text-center">{{i+1}}</td>
          <td class="text-center"><img :src="item.Product.image_url" style="width: 20%" ></td>
          <td class="text-center">{{ item.Product.name }}</td>
          <td class="text-center"><v-btn depressed small @click="min(item.id)" :disabled="item.quantity < 1" ><v-icon>mdi-minus</v-icon></v-btn> {{item.quantity}}  <v-btn depressed small @click="add(item.id) " :disabled="item.quantity >= item.Product.stock"><v-icon>mdi-plus</v-icon></v-btn></td>
          <td class="text-center">{{  Number(item.quantity) * Number(item.Product.price)}}</td>
          <td class="text-center"> <v-btn depressed small @click="deleted(item.id)"><v-icon>mdi-cancel</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-toolbar flat style="margin-top: 20px">
    <h3>Total:</h3>
  <v-spacer ></v-spacer>
    <h3 style="margin-left:20px">{{total.toLocaleString('id-ID')}}</h3>
  </v-toolbar>
  <v-btn style="margin-left:92%" @click="checkout">BUY</v-btn>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      top
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
        top
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      items: [],
      text: '',
      snackbar: false
    }
  },
  components: {
  },
  computed: {
    total () {
      let total = 0
      this.items.forEach(el => {
        total += (el.Product.price * el.quantity)
      })
      return total
    }
  },
  methods: {
    fetch () {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/Cart/user',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.items = data
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    },
    deleted (id) {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/Cart/' + id,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.fetch()
          this.snackbar = true
          this.text = 'Cancel succses'
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    },
    add (id) {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/Cart/add',
        headers: {
          token: localStorage.token
        },
        data: {
          id: id
        },
        method: 'put'
      })
        .then(({ data }) => {
          this.fetch()
          this.snackbar = true
          this.text = 'addSuccses'
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    },
    min (id) {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/Cart/min',
        headers: {
          token: localStorage.token
        },
        data: {
          id
        },
        method: 'put'
      })
        .then(({ data }) => {
          this.fetch()
          this.snackbar = true
          this.text = 'DeleteSuccses'
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    },
    checkout () {
      axios({
        url: 'https://blooming-escarpment-15217.herokuapp.com/checkout/cart',
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.fetch()
          this.$router.push('/list')
          this.snackbar = true
          this.text = data
        })
        .catch(err => {
          this.snackbar = true
          this.text = err.response.data.message
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style>
  .cart-title {
    margin: 0.5em 0 0 0;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding: 0.75em;
    background: #35495E;
    color: #fff;
  }
  .cart-empty {
    text-align: center;
    margin: 4em 0 0 0;
    min-height: 300px;
  }
  .cart-total {
    background: #F1F1F1;
    margin: 0;
    padding: 0.75em;
  }
  .items {
    min-height: 300px;
  }
  .item {
    padding: 0.75em 0.5em;
    border-top: 1px solid #ddd;
  }
  .right {
    float: right;
  }
  .item-image {
    float: left;
    width: 20%;
  }
  .item-details {
    float: left;
    width: 80%;
    padding-left: 0.75em;
  }
  .item-title {
    margin: 0;
    font-weight: bold;
  }
  .item-price {
    margin: 0;
    font-size: 0.9em;
  }
  .add-btn, .inc, .dec {
    display: block;
    border: none;
    padding: 0.5em;
    outline: none;
  }
  .add-btn {
    width: 100%;
    background: #41B883;
    color: #fff;
  }
  .dec {
    width: 49%;
    background: #418cb8;
    color: #fff;
    margin-left: 1%;
    float: left;
  }
    .inc {
    width: 49%;
    background: #418cb8;
    margin-right: 1%;
    color: #fff;
    float: left;
  }
</style>
