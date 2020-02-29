<template>
  <TableCart />
</template>

<script>
import TableCart from '../components/TableCart.vue';

export default {
  components: {
    TableCart,
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.token) {
      next();
    } else {
      next('/login');
    }
  },
};
</script>

<style>

</style>
