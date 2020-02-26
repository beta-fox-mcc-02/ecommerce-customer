<template>
  <div id="store">
    <NavbarCustomer style="position:fixed; z-index: 1; top: 0px; width: 100%;" class="shadow"/>
    
    <router-view />
    <slot name="footer"></slot>
  </div>
</template>

<script>
import AllProducts from '@/components/AllProducts'
import NavbarCustomer from '@/components/NavbarCustomer'
export default {
  name: `Store`,
  components: {
    AllProducts,
    NavbarCustomer
  },
  data () {
    return {

    }
  },
  methods: {

  },
  created () {
    this.$store.dispatch('getAllItem')
  },
  computed: {
    Products () {
      return this.$store.state.allProduct
    }
  }
}
</script>

<style>

</style>