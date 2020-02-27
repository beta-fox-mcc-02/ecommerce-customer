<template>
  <tr>
    <!-- {{item}} -->
    <td class="product-thumbnail">
      <img :src="item.Product.image_url" alt="Image" class="img-fluid" />
    </td>
    <td class="product-name">
      <h2 class="h5 cart-product-title text-black">{{item.Product.name}}</h2>
    </td>
    <td>$ {{item.Product.price}}</td>
    <td>{{item.jumlah}}</td>
    <td>$ {{item.price}}</td>
    <td>
      <a href="#" class="btn btn-primary height-auto btn-sm" @click.prevent="deleteCart(item.ProductId)">X</a>
    </td>
  </tr>
</template>

<script>
name: 'itemCart'
import axios from '../api/axiosInstance'
export default {
  props:{
    item:Object
  },
  methods:{
    deleteCart(id){
      // console.log(id);
      axios({
        method: "delete",
        url: `/cart/${id}`,
        data: {
          email: this.email,
          password: this.password
        },
         headers: {
          token : localStorage.token
        }
      })
        .then(({ data }) => {
          // this.$router.push('/')
          // this.$store.state.cartData
          this.$store.dispatch('getCart')
          this.$vToastify.danger("item remove from cart", "deleted!"); 


        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed:{
    total(){
      let t = (this.item.product.price * this.item.jumlah)
      return t
    }
  }
};
</script>

<style scoped>
img{
  max-height: 8rem;
  object-fit:contain;
}
</style>