<template>
    <div>
        <div class="container">
            <div class="box">
            <h1 class="has-text-centered has-text-info is-size-3"><strong>LEGO MINIFIGURES</strong></h1><hr>
                <div class="columns is-multiline" >
                    <div class="column is-4" v-for="product in products.products" :key="product.id">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image">
                                    <img :src="product.image_url">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content is-size-5 has-text-black">
                                    {{ product.name }}
                                </div>
                                <div class="media is-clickable" @click="productDetail(product)">
                                    <div class="media-left has-text-info is-size-6" v-if="product.stock > 0">
                                        Details
                                    </div>                            
                                    <div class="media-left has-text-danger is-size-6" v-else>
                                        OUT OF STOCK
                                    </div> 
                                    <br>
                                    <div class="media-right has-text-right is-size-6">
                                        IDR {{ product.price }}
                                    </div>
                                </div><hr>
                                <div class="has-text-right">
                                    <i class="fas fa-edit is-clickable"  @click.prevent="editProduct(product)" v-if="isLogin && isAdmin">|</i>
                                    <i class="fas fa-trash-alt is-clickable"  @click.prevent="deleteProduct(product.id)" v-if="isLogin && isAdmin"></i> 
                                    
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div class="column is-4 rounded" @click="addProduct" v-if="isLogin && isAdmin">
                        <div class="card is-clickable">
                            <div class="card has-text-centered">
                                <i class="fas fa-plus"></i>
                            </div>
                        </div>                
                    </div>                    
                </div>        
            </div>        
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: 'productList',
    computed: {
        ...mapState(['products', 'isLogin', 'isAdmin'])
    },
    methods: {
        productDetail(productDetail) {
            this.$router.push({
                name: 'product',
                params: {
                    id: productDetail.id,
                    productDetail
                }
            })
        },
        editProduct(productDetail) {
            console.log(productDetail)
            this.$router.push({
                name: 'editProduct',
                params: {
                    id: productDetail.id,
                    productDetail
                }
            })
        },
        deleteProduct(productId) {
            this.$store.dispatch('deleteProduct', productId)
            .then(data => {
                console.log(data)
                this.toastify('success', 'item is deleted')
                this.$router.push('/products')
            })
            .catch(err => {
                console.log(err)
                this.toastify('error', 'Login First')
            })
        },
        addProduct() {
            this.$router.push({
                name: 'addProduct'
            })
        }                         
    },
    created() {
        this.$store.dispatch('fetchProducts')
    }
}
</script>

<style>
.is-clickable {
  cursor: pointer;
}
</style>