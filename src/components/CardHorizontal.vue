<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img style="padding: 30px" :src="product.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col style="text-align: left">
          <b-card-body :title="product.name">
            <b-card-text class="custom-text">
              <div class="container-info">
                <h5>Price</h5>
                <p>Rp. {{ product.price.toLocaleString() }}</p>
              </div>
              <div class="container-info">
                <h5>Stock</h5>
                <p>{{ product.stock }}</p>
              </div>
              <div class="container-info">
                <h5>Description</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Quia nobis accusantium,
                  in voluptatem ratione nisi maxime laborum eveniet,
                  veritatis assumenda reiciendis laboriosam perspiciatis
                  alias dignissimos repellat, minima cumque ipsa fugit.
                </p>
              </div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <p
              v-if="!product.stock"
              style="font-size: 20px; text-decoration: line-through"
              href>
              Add to Cart
              </p>
              <a
              v-if="product.stock"
              @click.prevent="toggleAddCart"
              style="font-size: 20px"
              href>
              {{ cart.length ? 'Update Cart' : 'Add to Cart' }}
              </a>
              <div v-if="showAddCart" style="margin-top: 15px">
                <label for="sb-small">Quantity</label>
                <b-form-spinbutton
                style="max-width: 250px"
                id="sb-small"
                size="sm"
                min="0"
                :max="product.stock"
                v-model="quantity"
                step="1"
                class="mb-2">
                </b-form-spinbutton>
                <b-button
                @click.prevent="cart.length ? editCart() : addCart()"
                pill variant="success">
                  {{ cart.length ? 'Update Cart' : 'Add to Cart' }}
                </b-button>
              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import productAPI from '../API/productAPI';
import cartAPI from '../API/cartAPI';

export default {
  data() {
    return {
      quantity: 0,
      showAddCart: false,
      product: {
        id: '',
        image_url: '',
        name: '',
        price: '',
        stock: '',
      },
      cart: {},
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    resetError() {
      this.$store.commit('setError', '');
    },
    toggleAddCart() {
      if (localStorage.token) {
        if (this.showAddCart) {
          this.showAddCart = false;
        } else {
          this.showAddCart = true;
        }
      } else {
        this.$router.push('/login');
      }
    },
    editCart() {
      this.resetError();
      const payload = {
        PersonId: localStorage.person_id,
        ProductId: this.$route.params.productId,
        quantity: this.quantity,
      };
      this.$store.dispatch('editCart', payload)
        .then(() => {
          if (this.quantity) {
            this.$store.commit('showAlert', {
              successMessage: 'Cart is Successfully Updated',
              interval: 2000,
            });
          } else {
            this.$store.commit('showAlert', {
              successMessage: 'Product is Removed From Cart',
              interval: 2000,
            });
          }
          return this.$store.dispatch('fetchUserData', localStorage.person_id);
        })
        .then((response) => {
          this.$store.commit('setLogin', response.data);
          return cartAPI.get(`/${localStorage.person_id}/${this.$route.params.productId}`);
        })
        .then((res) => {
          this.cart = res.data;
          if (res.data.length) {
            this.quantity = res.data[0].quantity;
          }
        })
        .catch((err) => {
          const error = Array.isArray(err.response.data.error)
            ? err.response.data.error[0] : err.response.data.error;
          this.$store.commit('setError', error);
        })
        .finally(() => {
          this.$store.commit('stopLoading');
        });
    },
    addCart() {
      this.resetError();
      if (this.quantity) {
        const payload = {
          PersonId: localStorage.person_id,
          ProductId: this.$route.params.productId,
          quantity: this.quantity,
        };
        this.$store.dispatch('addCart', payload)
          .then(() => {
            this.$store.commit('showAlert', {
              successMessage: 'Cart is Successfully Added',
              interval: 2000,
            });
            return this.$store.dispatch('fetchUserData', localStorage.person_id);
          })
          .then((response) => {
            this.$store.commit('setLogin', response.data);
            return cartAPI.get(`/${localStorage.person_id}/${this.$route.params.productId}`);
          })
          .then((res) => {
            this.cart = res.data;
            if (res.data.length) {
              this.quantity = res.data[0].quantity;
            }
          })
          .catch((err) => {
            const error = Array.isArray(err.response.data.error)
              ? err.response.data.error[0] : err.response.data.error;
            this.$store.commit('setError', error);
          })
          .finally(() => {
            this.$store.commit('stopLoading');
          });
      } else {
        this.$store.commit('setError', 'No Quantity Added');
      }
    },
  },
  created() {
    this.$store.commit('setLoading');
    productAPI.get(`/${this.$route.params.productId}`)
      .then((response) => {
        this.product = response.data;
        return cartAPI.get(`/${localStorage.person_id}/${this.$route.params.productId}/false`);
      })
      .then((res) => {
        this.cart = res.data;
        if (res.data.length) {
          this.quantity = res.data[0].quantity;
        }
      })
      .catch(() => {
        // this.$router.push('/');
      })
      .finally(() => {
        this.$store.commit('stopLoading');
      });
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.$store.commit('setLoading');
        productAPI.get(`/${to.params.productId}`)
          .then((response) => {
            this.product = response.data;
            return cartAPI.get(`/${localStorage.person_id}/${to.params.productId}`);
          })
          .then((res) => {
            this.cart = res.data;
            if (res.data.length) {
              this.quantity = res.data[0].quantity;
            }
          })
          .catch(() => {
            this.$router.push('/');
          })
          .finally(() => {
            this.$store.commit('stopLoading');
          });
      }
    },
  },
};
</script>

<style>
  .card-title{
    font-weight: 700;
  }
  .custom-text p{
    margin: 0;
  }
  .custom-text h5{
    margin: 0
  }
  .container-info{
    margin: 20px 0;
  }
</style>
