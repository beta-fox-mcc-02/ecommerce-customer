<template>
  <div id="purchased">

    <div id="content">
      <NavbarCustomer style="position:fixed; z-index: 1; top: 0px; width: 100%;" class="shadow" />
      
      <Loading v-if="loading" />

      <div class="container mb-5" style="margin-top: 10vh;" v-if="!loading">
        <h1 style="font-family: 'Playfair Display SC', serif">purchased history</h1>
        <p class="text-muted ml-1 p-0">
          <i>Total purchased price Rp. {{formatedTotal || 0}}</i>
        </p>
        <p class="text-muted ml-1 p-0">
          <i>{{purchased.length}} items</i>
        </p>

        <div class="row my-3" style="display: flex; justify-content: space-around">
          <PurchasedCart v-for="product in purchased" :key="product.id" :product="product" />
        </div>
      </div>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import NavbarCustomer from "../components/NavbarCustomer";
import PurchasedCart from "../components/PurchasedCard";
import Loading from '../components/Loading'
export default {
  name: `Purchased`,
  components: {
    NavbarCustomer,
    PurchasedCart,
    Loading
  },
  data() {
    return {};
  },
  computed: {
    purchased() {
      let carts = this.$store.state.myCarts;
      let arr = [];
      for (let i = 0; i <= carts.length - 1; i++) {
        if (carts[i].status) {
          arr.push(carts[i]);
        }
      }
      return arr;
    },
    total() {
      let total = 0;
      for (let i = 0; i <= this.purchased.length - 1; i++) {
        let temp = this.purchased[i].quantity * this.purchased[i].Product.price;
        total += temp;
      }
      return total;
    },
    loading () {
       return this.$store.state.loading
    },
    formatedTotal () {
      return (this.total).toLocaleString('id-ID')
    }
  },
  created() {
    this.$store.dispatch("getAllMyCart");
  }
};
</script>

<style>
</style>