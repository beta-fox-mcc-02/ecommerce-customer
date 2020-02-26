<template>
    <b-navbar class="is-black">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                BRICKTIV8
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item>
                <router-link to="/products" @click="openLoading">Products</router-link>
                <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
            </b-navbar-item>
            <b-navbar-dropdown label="Admin" v-if="isLogin && isAdmin">
                <b-navbar-item @click="addProduct">
                    Add More Product
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-dropdown label="Customer" v-if="isLogin && !isAdmin">
                <b-navbar-item>
                    View Transaction History
                </b-navbar-item>
            </b-navbar-dropdown>            
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons ">
                    <a class="button" v-if="isLogin && !isAdmin" @click="viewCart">
                        <b-icon
                            icon="cart"
                            size="is-small">
                        </b-icon>
                         View Cart (0 items)                   
                    </a>
                    <a class="button is-white has-text-info" v-if="!isLogin">
                        <router-link to="/login">
                            Register / Login
                        </router-link>
                    </a>
                    <a class="button is-danger" @click="logout" v-if="isLogin">
                        Logout
                    </a>                    
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isLoading: false,
            isFullPage: true
        }
    },    
    computed: {
        ...mapState(['isLogin', 'isAdmin'])
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('isAdmin')
            this.$store.commit('SET_SESSION', false)
            this.$store.commit('USER_STATUS', null)
            this.$router.push('/')
            this.toastify('success', 'See You!')
        },
        addProduct() {
            this.$router.push({
                name: 'addProduct'
            })
        },
        openLoading() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 10 * 1000)
        },
        viewCart() {
            this.$router.push({
                name: 'cart'
            })
        }
    }
}
</script>

<style>

</style>