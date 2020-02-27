<template>
<div>
  <navbar />
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</div>
</template>

<script>
import navbar from '@/components/navbar.vue'
export default {
  name: 'App',

  components: {
    navbar
  },

  data: () => ({
    //
  })
}
</script>
