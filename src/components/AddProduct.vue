<template>
  <div>
    <b-button v-b-modal.add class="btn btn-success text-light"><i class="fas fa-plus-square"></i></b-button>
    <b-modal id="add" title="New Gundam" hide-footer>
        <b-form @submit.prevent="register" class="text-center">
              <b-form-group id="input-group-1" label="Gundam Name:" label-for="input-1">
              <b-form-input
              id="input-1"
              v-model="name"
              type="text"
              required
              placeholder="Enter Gundam Name"
              ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="Image URL:" label-for="input-2">
              <b-form-input
              id="input-2"
              type='text'
              v-model="imageUrl"
              placeholder="Enter Gundam Image Url"
            ></b-form-input>
            </b-form-group>
              <b-form-group id="input-group-3" label="Price:" label-for="input-3">
              <b-form-input
              id="input-3"
              type='number'
              v-model="price"
              required
              placeholder="Enter Gundam Price"
            ></b-form-input>
            </b-form-group>
              <b-form-group id="input-group-4" label="Stock:" label-for="input-4">
              <b-form-input
              id="input-4"
              type='number'
              v-model="stock"
              required
              placeholder="Enter Gundam Stock"
            ></b-form-input>
            </b-form-group>
            <b-button class="btn-success" type="submit" variant="primary">Add Gundam</b-button>
        </b-form>
    </b-modal>
  </div>
</template>

<script>
import Toastify from 'toastify-js'
export default {
//   name: 'NewGundam',
  data () {
    return {
      name: '',
      imageUrl: '',
      price: 0,
      stock: 0
    }
  },
  methods: {
    register () {
      const NewGundam = {
        name: this.name,
        image_url: this.imageUrl,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('addProduct', NewGundam)
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$bvModal.hide('add')
        })
        .catch(({ response }) => {
          console.log(response.data.err)
          response.data.err.forEach(element => {
            Toastify({
              text: element,
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              className: 'info'
            }).showToast()
          })
        })
    }
  }
}
</script>

<style>

</style>
