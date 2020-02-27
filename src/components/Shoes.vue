<template>
    <v-container
        fluid
        style="margin-top: 127px;"
    >
        <router-view></router-view>
    </v-container>
</template>

<script>
export default {
  name: 'Shoes',
  methods: {
    fetchCartData () {
      this.$emit('fetchCartData')
    }
  }
}
</script>
