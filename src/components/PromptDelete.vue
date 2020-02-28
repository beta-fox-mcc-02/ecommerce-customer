<template>
  <v-row justify="center">
    <v-icon @click.stop="dialog = true" class="pointer hvr">mdi-trash-can</v-icon>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete Product</v-card-title>

        <v-card-text>
          Are you sure You want to delete {{ product.name }}
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
            @click="deleteProduct"
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
  name: 'PromptDelete',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    deleteProduct () {
      this.dialog = false
      this.$store.dispatch('deleteProduct', this.product.id)
        .then(({ data }) => {
          this.$notify({
            group: 'sign',
            title: 'Success',
            text: data.msg,
            type: 'success'
          })
          this.$store.dispatch('fetchProducts')
        })
    }
  },
  props: ['product']
}
</script>
