<template>
  <div id="Allproducts">
    <div class="header-customer shadow mt-4" style="border">
        <small>.</small>
        <h1
          style="margin-top: 170px; font-family: 'Merriweather', serif;"
          class="text-center shadow"
        >We create something great together.</h1>
      </div>

    <Loading v-if="loading" />  

    <div class="container my-5" v-if="!loading">
      <div class="row" style="display: flex; justify-content: space-around">
        <div class="content" v-for="product in allProducts" :key="product.id">
          <div class="card" style="width: 18rem; cursor: pointer" @click="getDetail(product.id)">
            <img
              id="image-card"
              class="align-self-center shadow my-3"
              :src="product.image_url"
              style="display: block;
            max-width:250px;
            min-height:250px;
            width: auto;
            height: auto"
            />
            <div class="card-body">
              <h5 class="card-title">{{product.name}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Stock {{product.stock}}</h6>
              <p class="card-text text-right">
                <strong>Rp. {{product.price}}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading";
export default {
  name: "AllProduct",
  components: {
    Loading
  },
  data() {
    return {};
  },
  methods: {
    getDetail(productId) {
      this.$router.push(`/store/${productId}`);
    }
  },
  created() {
    this.$store.dispatch("getAllItem");
  },
  computed: {
    allProducts() {
      return this.$store.state.allProduct;
    },
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<style scoped>
.card {
  border: none;
}

#image-card {
  -webkit-filter: drop-shadow(5px 5px 5px #222);
  filter: drop-shadow(5px 5px 5px #222);
  transition: transform 0.5s;
  overflow: hidden;
}

#image-card:hover {
  transform: scale(1.2);
}

.header-customer {
  min-height: 70vh;
  /* background-image: url("https://i.gifer.com/CWyf.gif"); */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/banner.gif");
  background-size: cover;
  background-position: 0px -40px;
}

h1 {
  color: white;
  text-shadow: 3px 2px #4e50b1;
}

h1:hover {
  color: #f3e961;
  cursor: none
}
</style>
