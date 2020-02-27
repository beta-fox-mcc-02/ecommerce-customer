<template>
  <div class="mt-5">
    <Loading v-if="loading" />

    <div id="content" v-if="!loading" style="margin-top: 100px; margin-bottom: 100px">
      <div class="container mt-5 mb-3">
        <div class="row">
          <div class="col">
            <img id="image-card" :src="product.image_url" alt="Product image" />
          </div>
          <div class="col-lg-6 justify-content-center flex-row align-self-center mt-5">
            <div class="container">
              <div class="row border-bottom">
                <div class="col-4 text-left">
                  <h4>Name</h4>
                </div>
                <div class="col-8 text-left product-name mb-3">
                  <h3>{{ product.name }}</h3>
                </div>
              </div>
              <div class="row border-bottom mt-3">
                <div class="col-4 text-left">
                  <h6>Price</h6>
                </div>
                <div class="col-8 text-left">
                  <p>Rp. {{ formatedTotal }}</p>
                </div>
              </div>
              <div class="row border-bottom mt-3">
                <div class="col-4 text-left">
                  <h6>Stock</h6>
                </div>
                <div class="col-8 text-left">
                  <p>{{ product.stock }}</p>
                </div>
              </div>
              <div class="row border-bottom mt-3">
                <div class="col-4 text-left">
                  <h6>Category</h6>
                </div>
                <div class="col-8 text-left">
                  <p>{{ product.Category.tag }}</p>
                </div>
              </div>
              <div class="row my-4" style="display: flex; justify-content: center">
                <form @submit.prevent="addCart">
                  <div class="qty mt-3">
                    <span class="minus bg-secondary" @click="addQuantity('kurang')">-</span>
                    <input
                      type="number"
                      class="count"
                      name="qty"
                      min="1"
                      :max="product.stock"
                      v-model="quantity"
                    />
                    <span class="plus bg-secondary" @click="addQuantity('tambah')">+</span>
                  </div>
                  <button type="submit" class="btn btn-white mt-4">
                    Add to cart
                    <i class="fas fa-cart-plus ml-1"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axiosInstance";
import Loading from "../components/Loading";
export default {
  name: "ProductDetail",
  components: {
    Loading
  },
  data() {
    return {
      product: "",
      quantity: 0
    };
  },
  methods: {
    getProduct() {
      this.$store.commit("SET_LOADING", true);
      axios({
        method: `GET`,
        url: `/products/${this.$route.params.productId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.product = data.data;
          this.$store.commit("SET_LOADING", false);
        })
        .catch(err => {
          console.log(err.response.data.msg);

          let error = err.response.data.msg;
          Toastify({
            text: `No item with id ${this.$route.params.productId}`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
          this.$router.push("/store");
        });
    },
    addQuantity(opt) {
      if (opt === "tambah") {
        if (this.quantity < this.product.stock) {
          this.quantity++;
        }
      } else {
        if (this.quantity > 0) {
          this.quantity--;
        }
      }
    },
    addCart() {
      if (!localStorage.token) {
        this.$store.commit("NOTIFICATION", `you need to login first`);
        this.$router.push("/login");
      } else {
        axios({
          method: `POST`,
          url: `/carts`,
          data: {
            ProductId: this.product.id,
            quantity: this.quantity
          },
          headers: {
            token: localStorage.token
          }
        })
          .then(({data}) => {
            
            this.$router.push('/mycart')
            Toastify({
              text: `Successfully add product to cart!`,
              backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
              className: "info"
            }).showToast();
          })
          .catch(err => {
            Toastify({
              text: `${err.response.data.msg}`,
              backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
              className: "info"
            }).showToast();
          });
      }
    }
  },
  created() {
    this.getProduct();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    formatedTotal () {
      return (this.product.price).toLocaleString('id-ID')
    }
  }
};
</script>

<style scoped>
#image-card {
  cursor: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  min-height: 300px;
  width: auto;
  height: auto;
  -webkit-filter: drop-shadow(5px 5px 5px #222);
  filter: drop-shadow(5px 5px 5px #222);
  overflow: hidden;
  transition: transform 0.5s;
}

#image-card:hover {
  transform: scale(1.2);
}

.qty .count {
  color: #000;
  display: inline-block;
  vertical-align: top;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  padding: 0 2px;
  min-width: 35px;
  text-align: center;
}
.qty .plus {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  color: white;
  width: 30px;
  height: 30px;
  font: 30px/1 Arial, sans-serif;
  text-align: center;
  border-radius: 50%;
}
.qty .minus {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  color: white;
  width: 30px;
  height: 30px;
  font: 30px/1 Arial, sans-serif;
  text-align: center;
  border-radius: 50%;
  background-clip: padding-box;
}
div {
  text-align: center;
}
.minus:hover {
  background-color: #717fe0 !important;
}
.plus:hover {
  background-color: #717fe0 !important;
}
/*Prevent text selection*/
span {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
input {
  border: 0;
  width: 2%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input:disabled {
  background-color: white;
}
</style>