<template>
  <div>
    <div class="main-container">
    <div class="container alert alert-warning" role="alert" v-if="error">{{error}}</div>
    <div class="container success alert-success" role="success" v-if="success">{{success}}</div>
      <table border="1" id="products">
        <tr>
          <th>No</th>
          <th>Prouct name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
          <th>Checkout</th>
        </tr>
        <tbody v-for="(cart, i) in $store.state.carts" :key="cart.id">
          <tr>
            <td>{{ i + 1 }}</td>
            <td>{{ cart.Product.name }}</td>
            <td>
              <img
                :src="`${cart.Product.image_url}`"
                alt="img"
                class="table-image"
              />
            </td>
            <td>Rp. {{ cart.Product.price * cart.quantity }}</td>
            <td>{{ cart.quantity }}</td>
            <td>
                <b-button variant="danger" href="#" @click="deleteCart(cart.id)">
                    Delete
                </b-button>
            </td>
            <td>
                <b-button variant="success" href="#" @click="checkout(cart.id, cart.ProductId)">
                    Checkout
                </b-button>
            </td>
          </tr>
        </tbody>
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CartList',
    data() {
        return {
            loading: false,
            error: '',
            success: ''
        }
    },
    methods: {
        fetchAll() {
        this.loading = true;
        this.$store
            .dispatch("fetchCart")
            .then(response => {
                // console.log(response.data)
                this.$store.commit("resetCart");
                response.data.forEach(cart => {
                    this.$store.commit("setCart", cart);
                });
                this.loading = false;
                })
            .catch(err => {
                this.loading = false
                console.log(err)
                } 
            );
        },
        deleteCart(id) {
            console.log(id, 'id buat delete')
            this.loading = true
            axios({
                method: 'delete',
                // url: `http://localhost:3000/cart/delete/${id}`,
                url: `https://tranquil-coast-06554.herokuapp.com/cart/delete/${id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(data => {
                    this.loading = false
                    this.success = 'success delete product'
                    this.fetchAll()
                })
                .catch(err => {
                    if (err.response.data.msg) {
                        this.error = err.response.data.msg
                    } else if (err.response.data.msg) {
                        this.error = err.response.data.msg[0]
                    }
                    this.loading = false
                })
        },
        checkout(cartId, ProductId) {
            this.loading = true
            axios({
                method: 'put',
                // url: `http://localhost:3000/cart/checkout/${cartId}`,
                url: `https://tranquil-coast-06554.herokuapp.com/cart/checkout/${cartId}`,
                data: {
                    ProductId: ProductId
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(data => {
                    this.loading = false
                    this.success = 'Checkout success'
                    this.fetchAll()
                })
                .catch(err => {
                    if (err.response.data.msg) {
                        this.error = err.response.data.msg
                    } else if (err.response.data.msg) {
                        this.error = err.response.data.msg[0]
                    }
                    this.loading = false
                })
        }
    },
    created() {
        this.fetchAll()
    }
}
</script>

<style>
a {
  text-decoration: none;
}

.main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

#products {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;

}

#products td,
#products th {
  border: 1px solid #ddd;
  padding: 8px;
}

#products tr:nth-child(even) {
  background-color: #f2f2f2;
}

#products tr:hover {
  background-color: #ddd;
}

#products th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(15, 104, 177);
  color: white;
}

.table-image {
  height: 60px;
  width: 80px;
}
</style>