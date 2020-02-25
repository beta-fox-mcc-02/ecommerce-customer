<template>
  <div>
    <b-button data-toggle="modal" v-b-modal="'edit'+id" class="btn btn-success text-light"><i class="fas fa-edit"></i></b-button>
    <b-modal :id='"edit"+id' title="Edit Gundam" hide-footer>
        <b-form @submit.prevent="edit" class="text-center">
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
            <b-button class="btn-success" type="submit" variant="primary">Update Gundam</b-button>
        </b-form>
    </b-modal>
    <b-button data-toggle="modal" v-b-modal="'del'+id" class="btn btn-success text-light"><i class="fas fa-trash-alt"></i></b-button>
    <b-modal :id="'del'+id" title="Delete Gundam" hide-footer>
      <p>Are you realy sure?</p>
      <button @click="del" class="btn btn-danger"><i class="far fa-thumbs-up"></i></button>
      <button @click="no" class="btn btn-success"><i class="far fa-thumbs-down"></i></button>
    </b-modal>
  </div>
</template>

<script>
export default {
//   name: 'NewGundam',
  data () {
    return {
      id: this.Id,
      name: this.Name,
      imageUrl: this.ImageUrl,
      price: this.Price,
      stock: this.Stock
    }
  },
  props: {
    Id: Number,
    Name: String,
    ImageUrl: String,
    Price: Number,
    Stock: Number
  },
  methods: {
    edit () {
      const updateGundam = {
        id: this.id,
        name: this.name,
        image_url: this.imageUrl,
        price: this.price,
        stock: this.stock
      }
      // console.log(updateGundam)
      this.$store.dispatch('editProduct', updateGundam)
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$bvModal.hide(`edit${this.id}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    del () {
      this.$store.dispatch('deleteProduct', this.id)
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$bvModal.hide(`edit${this.id}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    no () {
      this.$bvModal.hide(`edit${this.id}`)
    }
  }
}
</script>

<style>

</style>
