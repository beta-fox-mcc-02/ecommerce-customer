<template>
  <v-dialog v-model="dialogDelete" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Are You Sure ?</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="editCart(cart)">
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text type="submit">Save</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialogDelete: Boolean
  },
  data: () => ({
  }),
  computed: {

  }
}
</script>
