<template>
  <div>
    <h1>Order Now</h1>
    <img src="../assets/loading.gif" v-if="seeLoading" />
    <div class="container mb-5" v-else>
      <div class="row">
        <div class="col-4">
          <img :src="aProduct.image_url" alt style="max-width: 35rem" />
        </div>
        <div class="col-8">
          <div style="margin-top: 10vh; ">
            <h1>{{aProduct.name}}</h1>
            <div class="text-left mt-5" style="margin-left: 25vh; ">
              <p>
                <strong>Processor :</strong> Apple dual-core 64-bit S4
              </p>
              <p>
                <strong>Display :</strong> 1.78 inch, LTPS OLED Retina 448x368 pixels resolution
              </p>
              <p>
                <strong>Operating system :</strong> WatchOS 5
              </p>
              <p>
                <strong>Battery :</strong> Up to 18 hours of advertised battery life
              </p>
            </div>
            <h2 class="mt-5">${{getPrice}}</h2>
          </div>
            <!-- <form >
  <input type="number" id="quantity" name="quantity" min="1" max="5"  v-model="jumlah">
</form> -->

          <div class="input-group" style="max-width: 120px; margin-left: auto; margin-right: auto">
            <div class="input-group-prepend">
              <button class="btn btn-outline-primary js-btn-minus" type="button" @click.prevent="setJumlah(-1)">&minus;</button>
            </div>
            <input
              type="number" 
              min="1" :max="item.stock"
              class="form-control text-center"
              v-model="jumlah"
              placeholder
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-primary js-btn-plus" type="button" @click.prevent="setJumlah(1)">&plus;</button>
            </div>
          </div>

          <button class="btn btn-primary mt-3" @click.prevent="addCart(aProduct.id)">Add to Cart</button>
        </div>
        <!-- {{aProduct.stock}} -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../api/axiosInstance'
export default {
  data(){
    return{
      jumlah: 1,
      item: {}
    }
  },
  methods: {
    setJumlah(jum){
      this.jumlah += jum
      if(this.jumlah < 1){
        this.jumlah = 1
      }else if(this.jumlah > this.item.stock){
        this.jumlah = this.item.stock
      }
    },
    addCart(id){
     
      if(localStorage.token){
        axios({
          method: 'post',
          url: '/cart',
          data:{
            ProductId: id,
            jumlah: this.jumlah
          },
          headers:{
            token: localStorage.token
          }
        })
        .then(data =>{
          this.$vToastify.success("item added to cart", "Got it!"); 
        })
        .catch(err=>{
          this.$vToastify.danger("item added to cart", "Got it!"); 
        })
        
      }else{
        this.$vToastify.warning("you need to login first!", "can't doo"); 

      }
      
    }
  },
  computed: {
    aProduct() {
      this.item = this.$store.state.product;
      return this.$store.state.product;
    },
    seeLoading() {
      return this.$store.state.loading;
    },
    getPrice(){
      return this.item.price * this.jumlah
    }
  },
  created: function() {
    let id = this.$route.params.id;
    this.$store.dispatch("getProduct", id);
  }
};
</script>

<style>
</style>