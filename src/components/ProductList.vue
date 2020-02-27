<template>
    <div class="card-container">
        <div class="container alert alert-warning" role="alert" v-if="error">{{error}}</div>
        <div class="container success alert-success" role="success" v-if="success">{{success}}</div>
        <div v-for="product in $store.state.products" :key="product.id">
            <b-card
                :title="product.name"
                :img-src="product.image_url"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem; height: fit-content"
                class="mb-2"
            >
                <b-card-text>
                Rp. {{ product.price }}
                </b-card-text>
                <b-card-text>
                    Stocks: {{ product.stocks }}
                </b-card-text>

                <b-button href="#" variant="primary" @click="addToCart(product.id, product.price)">Add to cart</b-button>
                <b-spinner label="Spinning" v-if="loadingAdd"></b-spinner>
            </b-card>
        </div>
        <b-spinner label="Spinning" v-if="loading"></b-spinner>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductList',
    data() {
        return {
            loading: false,
            loadingAdd: false,
            error: '',
            success: ''
        }
    },
    methods: {
        fetchAll(){
            this.loading = true
            this.$store.dispatch("fetchProduct")
                .then(data => {
                    this.loading = false
                    this.$store.commit("resetProduct")
                    this.$store.commit("setProduct", data.data)
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
        addToCart(ProductId, total_price){
            if(localStorage.access_token){
                this.loadingAdd = true
                axios({
                    method: 'get',
                    // url: `http://localhost:3000/cart/update/${ProductId}`,
                    url: `https://tranquil-coast-06554.herokuapp.com/cart/update/${ProductId}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                    .then(data => {
                        if(data) {
                            axios({
                                method: 'put',
                                // url: `http://localhost:3000/cart/update/${ProductId}`,
                                url: `https://tranquil-coast-06554.herokuapp.com/cart/update/${ProductId}`,
                                data: {
                                    quantity: 1
                                },
                                headers: {
                                    access_token: localStorage.getItem('access_token')
                                }
                            })
                                .then(data => {
                                    this.loadingAdd = false
                                    this.success = "Success add quantity product to your cart"
                                    // console.log(data, 'quantity updated')
                                })
                                .catch(err => {
                                     if (err.response.data.msg) {
                                        this.error = err.response.data.msg
                                    } else if (err.response.data.msg) {
                                        this.error = err.response.data.msg[0]
                                    }
                                    this.loadingAdd = false
                                })
                        }
                    })
                    .catch(() => {
                        // console.log(err, 'error findOne')
                        axios({
                                method: 'post',
                                // url: 'http://localhost:3000/cart/add',
                                url: 'https://tranquil-coast-06554.herokuapp.com/cart/add',
                                data: {
                                    ProductId: ProductId,
                                    total_price: total_price,
                                    quantity: 1
                                },
                                headers: {
                                    access_token: localStorage.getItem('access_token')
                                }
                        })
                                .then(data => {
                                    this.loadingAdd = false
                                    this.success = 'Success add new product to your cart'
                                    console.log(data, 'berhasil tambah cart')
                                })
                                .catch(err => {
                                    this.loadingAdd = false
                                    console.log(err, 'gagal tambah cart')
                                })
                    })    
            } else {
                this.error = 'Please login or register first to add to your cart'
                this.$router.push('/login')
            }
        }
    },
    created() {
        this.fetchAll()
    },
    computed: {
    }
}
</script>

<style>
    .card-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    img {
        height: 250px;
        width: 250px;
    }
</style>