<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: black">
      <a class="navbar-brand text-light">Welcome admin</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">          
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">See products</router-link>
          </li>
          <li class="nav-item">
            <span
              class="nav-link"
              style="cursor: pointer"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >Upload product</span>
          </li>
        </ul>
        <button class="btn btn-outline-info my-2 my-sm-0 shadow" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>

    <!-- modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
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
                <small class="text-muted ml-2">
                  <i>Select image for this product</i>
                </small>
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
                @click.prevent="createProduct"
              >Launch product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axiosInstance";
export default {
  name: "NavbarAdmin",
  data() {
    return {
      product: {
        name: "",
        image: "",
        price: "",
        stock: "",
        CategoryId: ""
      }
    };
  },
  methods: {
    logout() {
      localStorage.removeItem(`token`);
      localStorage.removeItem(`isAdmin`);

      this.$router.push("/");
      Toastify({
        text: "Logout success, bye bye admin",
        backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
        className: "info"
      }).showToast();
    },
    createProduct() {
      const photoFormData = new FormData()
      photoFormData.append('name', this.product.name)
      photoFormData.append('image_url', this.product.image)
      photoFormData.append('price', this.product.price)
      photoFormData.append('stock', this.product.stock)
      photoFormData.append('CategoryId', this.product.CategoryId)


      axios({
        method: `POST`,
        url: `/products`,
        data: photoFormData,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.product.name = "";
          this.product.image = "";
          this.product.price = "";
          this.product.stock = "";
          this.product.CategoryId = "";

          
          this.$store.dispatch("getAllItem");

          Toastify({
            text: "Product uploaded successfully",
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        })
        .catch(err => {
          let error = err.response.data.msg
           Toastify({
            text: `${error}`,
            backgroundColor: "linear-gradient(to right, #DA22FF, #9733EE)",
            className: "info"
          }).showToast();
        });
    },
    processFile(event) {
      this.product.image = event.target.files[0];
    }
  }
};
</script>

<style>
</style>