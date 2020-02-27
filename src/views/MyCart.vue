<template>
  <div id="mycart">
    <NavbarCustomer style="position:fixed; z-index: 1; top: 0px; width: 100%;" class="shadow" />
   <Loading v-if="loading"/>

    <div class="container mb-5" style="margin-top: 10vh;" v-if="!loading">
      <h1 style="font-family: 'Playfair Display SC', serif">
      my cart
      </h1>
      <p class="text-muted ml-1 p-0"><i>Total cart price Rp. {{formatedTotal || 0}}</i></p>
      <p class="text-muted ml-1 p-0"><i>{{products.length}} items</i></p>

      <div class="row my-3" style="display: flex; justify-content: space-around">
         <CartCard v-for="product in products" :key='product.id' :product='product'/>
      </div>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
import store from "../store/index";
import CartCard from "../components/CartCard";
import NavbarCustomer from "../components/NavbarCustomer";
import Loading from '../components/Loading'
export default {
  name: `MyCart`,
  components: {
    NavbarCustomer,
    CartCard,
    Loading
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    products() {
      let myCarts = this.$store.state.myCarts;
      let arr = [];
      for (let i = 0; i <= myCarts.length - 1; i++) {
        if (!myCarts[i].status) {
          arr.push(myCarts[i]);
        }
      }
      return arr;
    },
    loading() {
      return this.$store.state.loading;
    },
    total () {
       let total = 0
       for (let i = 0; i<=this.products.length-1; i++) {
          let temp = this.products[i].quantity * this.products[i].Product.price
          total += temp
       }
       return total
    },
    formatedTotal () {
      return (this.total).toLocaleString('id-ID')
    }
  },
  created() {
    this.$store.dispatch("getAllMyCart");
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.token) {
      next();
    } else {
      store.commit("NOTIFICATION", `You need to login first`);
      next("/login");
    }
  }
};
</script>

<style>
</style>