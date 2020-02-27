<template>
  <div class="text-left container my-3 py-3 shadow p-3 mb-5 rounded box-view">
    <Loading v-if="loading"/>
    <div v-else>
      <h4 class="head">{{ watch.name }}</h4>
      <div class="row justify-content-between">
        <div class="col-md-3">
          <img :src="watch.imageUrl" alt="watch image">
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-2">
              <p>Name</p>
            </div>
            <div class="col-md-1">
              <p> : </p>
            </div>
            <div class="col-md-9">
              <p>{{ watch.name }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <p>Description</p>
            </div>
            <div class="col-md-1">
              <p> : </p>
            </div>
            <div class="col-md-8">
              <p>{{ watch.description }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <p>Category </p>
            </div>
            <div class="col-md-1">
              <p> : </p>
            </div>
            <div class="col-md-8">
              <p>{{ watch.Category.name }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <p>Price </p>
            </div>
            <div class="col-md-1">
              <p> : </p>
            </div>
            <div class="col-md-8">
              <p>Rp. {{ price }},-</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <p>Stock </p>
            </div>
            <div class="col-md-1">
              <p> : </p>
            </div>
            <div class="col-md-8">
              <p>{{ watch.stock }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <p>Quantity </p>
            </div>
            <div class="col-md-1">
              <p> : </p>
            </div>
            <div class="col-md-8">
              <form @submit.prevent="addCart">
                <input type="number" id="quantity" v-model="quantity">
                <button class="btn float-right" type="submit"><span>Add To Chart</span></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  name: 'Detail',
  data () {
    return {
      quantity: 1
    }
  },
  components: {
    Loading
  },
  computed: {
    watch () {
      return this.$store.state.watch
    },
    loading () {
      return this.$store.state.loading
    },
    price () {
      return (this.watch.price).toLocaleString("id-ID")
    }
  },
  methods: {
    addCart () {
      if (localStorage.token) {
        this.$store.dispatch('addCart', {
          ProductId: this.watch.id,
          quantity: this.quantity
        })
          .then(_ => {
            Toastify({
              text: 'Success Add to Cart',
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              className: 'success'
            }).showToast()
          })
          .catch(_ => {
            Toastify({
              text: 'Failed Add to Cart',
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              className: 'error'
            }).showToast()
          })
      } else {
        Toastify({
          text: 'You Must Login First',
          backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
          className: 'error'
        }).showToast()
      }
    }
  },
  created () {
    this.$store.dispatch('fetchWatch', this.$route.params.id)
  }
}
</script>

<style scoped>
img {
  transition: 0.3s;
  width: 100%;
}

img:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.9);
  cursor: crosshair;
}

p {
  font-weight: 500;
}
</style>