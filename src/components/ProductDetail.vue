<template>
  <div class="mt-5">
    <Loading v-if="loading" />

    <div id="content" v-if="!loading">
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
                  <p>{{ product.price }}</p>
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
              <div class="row my-4" style="display: flex; justify-content: flex-end">
                <button
                  class="btn btn-secondary mx-2"
                  data-toggle="modal"
                  data-target="#editProduct"
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-dark mx-2" @click="deleteProduct">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div
      class="modal fade"
      id="editProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Upload product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <input class="form-control" placeholder="product name" v-model="product.name" />
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="product price" v-model="product.price" />
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="product stock" v-model="product.stock" />
              </div>
              <div class="form-group">
                <!-- <label for="exampleFormControlFile1">Example file input</label> -->
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  @change="processFile($event)"
                />
              </div>
              <div class="form-group">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="product.CategoryId"
                >
                  <option value="1">cloth</option>
                  <option value="2">accessories</option>
                  <option value="3">pants</option>
                  <option value="4">jacket</option>
                  <option value="5">suits</option>
                  <option value="6">dress</option>
                </select>
                <small class="text-muted ml-2">
                  <i>Select category for this product</i>
                </small>
              </div>
              <button
                type="submit"
                class="btn btn-info shadow"
                style="margin-left: 165px;"
                data-dismiss="modal"
                @click.prevent="submitEditProduct"
              >Submit change</button>
            </form>
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
      product: ""
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
          let error = err.response.data.msg;
          Toastify({
            text: `${error}`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        });
    },
    deleteProduct() {
      axios({
        method: "DELETE",
        url: `/products/${this.$route.params.productId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Toastify({
            text: `Product with id ${this.$route.params.productId} has been deleted`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();

          this.$router.push("/admin");
        })
        .catch(err => {
          let error = err.response.data.msg;
          Toastify({
            text: `${error}`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        });
    },
    submitEditProduct() {
      const photoFormData = new FormData();
      photoFormData.append("name", this.product.name);
      photoFormData.append("image_url", this.product.image_url);
      photoFormData.append("price", this.product.price);
      photoFormData.append("stock", this.product.stock);
      photoFormData.append("CategoryId", this.product.CategoryId);

      this.$store.commit("SET_LOADING", true);

      axios({
        method: "PUT",
        url: `/products/${this.$route.params.productId}`,
        data: photoFormData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.getProduct();
          Toastify({
            text: "updated successfully!",
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        })
        .catch(err => {
          console.log(err.response);

          let error = err.response.data.msg;
          Toastify({
            text: `${error}`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        });
    },
    processFile(event) {
      this.product.image_url = event.target.files[0];
    }
  },
  created() {
    this.getProduct();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<style scoped>
#image-card {
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
</style>