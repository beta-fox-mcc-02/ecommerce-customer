<template>
    <div>
        <b-navbar type="primary" variant="primary" class="navbar-saya">
            <b-navbar-nav>
            <b-nav-item href="#"><b-button href="#" variant="primary" @click.prevent="changePage('product')">Product</b-button></b-nav-item>
            <b-nav-item href="#" v-if="isLogin"><b-button href="#" variant="primary" @click.prevent="changePage('cart')">Cart</b-button></b-nav-item>
            <b-nav-item href="#" v-if="isLogin"><b-button href="#" variant="primary" @click.prevent="changePage('history')">History</b-button></b-nav-item>
            <b-nav-item href="#" v-if="!isLogin"><b-button href="#" variant="primary" @click.prevent="changePage('login')">Login</b-button></b-nav-item>
            <b-nav-item href="#" v-if="!isLogin"><b-button href="#" variant="primary" @click.prevent  ="changePage('register')">Register</b-button></b-nav-item>
            <b-nav-item v-if="isLogin"><b-button href="#" variant="primary" @click.prevent="logout">Logout</b-button></b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            login: false
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$store.commit("setLogin", false)
            this.$router.push("/")
        },
        changePage(page) {
            this.$router.push(`/${page}`)
        }
    },
    created() {
        if(localStorage.access_token) {
            this.$store.commit("setLogin", true)
        } else {
            this.$store.commit("setLogin", false)
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        }
    }
}
</script>

<style>
    .nav-menu {
        color: white;
    }
    .navbar-saya {
        margin-bottom: 8px;
    }
</style>