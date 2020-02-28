<template>
  <v-row justify="center">
    <v-icon @click.stop="dialog = true" class="pointer hvr">mdi-pencil</v-icon>
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title class="headline">Update Product</v-card-title>

        <v-card-text>
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
                prepend-icon="mdi-camera"
                v-model="image"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="updateProduct"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'PromptUpdate',
  data () {
    return {
      dialog: false,
      name: this.product.name,
      price: this.product.price,
      stock: this.product.stock,
      description: this.product.description,
      image: this.product.image
    }
  },
  methods: {
    updateProduct () {
      const loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })
      this.dialog = false
      this.$store.dispatch('uploadImage', this.image)
        .then(({ data }) => {
          return this.$store.dispatch('updateProduct', {
            data: {
              name: this.name,
              price: this.price,
              stock: this.stock,
              description: this.description,
              image: data.link
            },
            id: this.product.id
          })
        })
        .then(({ data }) => {
          loader.hide()
          this.$notify({
            group: 'sign',
            title: 'Success',
            text: data.msg,
            type: 'success'
          })
          this.$store.dispatch('fetchProducts')
        })
        .catch(({ response }) => {
          loader.hide()
          console.log(response)
          this.$notify({
            group: 'sign',
            title: 'error',
            text: response.msg || 'Update product failed',
            type: 'success'
          })
        })
    }
  },
  props: ['product']
}
</script>
