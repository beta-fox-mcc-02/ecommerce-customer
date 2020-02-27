<template>
  <v-container justify="center" align="center" fluid style="margin-top: 127px;">
      <v-toolbar
        color="cyan"
        dark
    >
        <v-toolbar-title>Categories</v-toolbar-title>
    </v-toolbar>
      <v-row>
        <v-col
          v-for="{id, name, bg_img} in categories"
          :key="id"
          cols="12"
          sm="12"
          md="6"
          lg="3"
        >
          <v-hover
            v-slot:default="{ hover }"
          >
            <v-card :elevation="hover ? 13 : 2" link>
                <v-img
                class="black--text align-end"
                height="200"
                :src="bg_img"
                >
                <v-card-title class="text-capitalize">{{ name }}</v-card-title>
                </v-img>
                <v-card-action></v-card-action>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Categories',
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  created () {
    this.$store.dispatch('getAllCategories')
  }
}
</script>
