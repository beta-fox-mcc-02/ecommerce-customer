<template>
  <div id="addProduct" class="container container-fluid">
    <v-card class="mt-5">
      <v-card-text>
        <h2 class="ml-3">Add Product</h2>
        <v-row>
          <v-col cols="3">
            <v-subheader>Product Name</v-subheader>
          </v-col>
          <v-col cols="1"><v-subheader>:</v-subheader></v-col>
          <v-col cols="8">
            <v-text-field
              required
              placeholder="Product name..."
              v-model="name"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>Price</v-subheader>
          </v-col>
          <v-col cols="1"><v-subheader>:</v-subheader></v-col>
          <v-col cols="8">
            <v-text-field
              type="number"
              prefix="Rp"
              placeholder="Price (number only)..."
              v-model="price"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>Stock</v-subheader>
          </v-col>
          <v-col cols="1"><v-subheader>:</v-subheader></v-col>
          <v-col cols="8">
            <v-text-field
              type="number"
              suffix="pcs"
              placeholder="Stock product (number only)..."
              v-model="stock"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>Description</v-subheader>
          </v-col>
          <v-col cols="1"><v-subheader>:</v-subheader></v-col>
          <v-col cols="8">
            <v-text-field
              placeholder="Description..."
              v-model="description"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-subheader>Image</v-subheader>
          </v-col>
          <v-col cols="1"><v-subheader>:</v-subheader></v-col>
          <v-col cols="8">
            <v-file-input
              placeholder="Add Image..."
              dense
              v-model="image"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-btn @click="AddProduct" color="primary" dark>
          <v-icon left>mdi-plus-thick</v-icon>Add Produk
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      price: '',
      stock: null,
      description: '',
      image: null
    }
  },
  methods: {
    // handleFileUpload(){
    //     this.image = this.$refs.file
    // },
    emptyForm () {
      this.name = ''
      this.price = ''
      this.stock = ''
      this.description = ''
      this.image = null
    },
    AddProduct () {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      this.$store.dispatch('uploadImage', this.image)
        .then(({ data }) => {
          return this.$store.dispatch('addProduct', {
            name: this.name,
            price: this.price,
            stock: this.stock,
            description: this.description,
            image: data.link
          })
        })
        .then(({ data }) => {
          loader.hide()
          console.log('Result add product:', data)
          this.emptyForm()
          this.$notify({
            group: 'sign',
            title: 'Success',
            text: data.msg,
            type: 'success'
          })
          this.$router.push('/')
        })
        .catch(({ response }) => {
          loader.hide()
          console.log('Result error add product:', response)
          this.emptyForm()
          if (response.data.name === 'SequelizeValidationError') {
            response.data.errors.forEach(error => {
              this.$notify({
                group: 'sign',
                title: 'Add product error',
                text: error.msg,
                type: 'error'
              })
            })
          } else {
            this.$notify({
              group: 'sign',
              title: 'Add product error',
              text: response.data.msg,
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style>

</style>
