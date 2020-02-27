<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">SellCell</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item @click="viewCart" href="#">Your Cart</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavbarPanel',
  methods: {
    viewCart () {
      console.log(this.id)
      this.$store.dispatch('viewAllCart', this.id)
        .then(({ data }) => {
          this.$store.commit('FETCH_ALL_CARTS', data)
          this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    id () {
      return this.$store.state.costumerId
    }
  }
}
</script>

<style>

</style>
