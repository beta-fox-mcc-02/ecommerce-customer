<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import RegisterCost from '@/components/Register.vue'
export default {
  name: 'Home',
  data () {
    return {
      loginEmail: '',
      loginPass: ''
    }
  },
  components: {
    // RegisterCost
  }
}
</script>
