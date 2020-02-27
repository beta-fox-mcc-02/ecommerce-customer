<template>
  <v-card color="basil">

    <v-tabs
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
      >
      </v-tab>
    </v-tabs>

    <v-tabs-items>
      <v-tab-item
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>huwhuw</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        {
          title: 'Description',
          message: 'bla bla'
        }
      ]
    }
  }
}
</script>

<style>

</style>
