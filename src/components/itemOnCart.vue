<template>
  <md-card id="innercard">
    <md-card-content style="width: 100px; padding: 0">
      <md-card-media class="imageRatio">
        <img :src=product.imageUrl>
      </md-card-media>
    </md-card-content>
    <md-card-content style="position: absolute; top: 0; left: 150px;">
      <table style="font-size: 1rem;">
        <tr align="left">
          <th width="160;" align="left">Product Name</th>
          <td>{{ product.name }}</td>
        </tr>
        <tr align="left">
          <th>Price</th>
          <td>{{ product.price }}</td>
        </tr>
        <tr align="left">
          <th>Quantity</th>
          <td>
            <input type="number" style="width: 3rem;" :value=product.Cart.quantity disabled>
          </td>
        </tr>
      </table>
    </md-card-content>
    <b-button variant="danger" size="sm" style="position: absolute; top: 10px; right: 10px;" @click.prevent="confirm">
      <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
    </b-button>
  </md-card>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    deleteFromCart () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.dispatch('deleteFromCart', this.product.Cart)
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.dispatch('getCart')
          this.$store.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.$store.commit('SET_IS_LOADING', false)
        })
    },
    confirm () {
      this.$alertify.confirmWithTitle(
        'Delete Product',
        'Are you sure want to delete this product?',
        () => this.deleteFromCart()
      )
    }
  }
}
</script>

<style scoped>
  #innercard {
    width: 100%;
    background: rgba(0,0,0,.5);
    margin-bottom: 1rem;
    color:powderblue;
  }
  .imageRatio {
    overflow: hidden
  }
  .imageRatio:before {
    width: 100%;
    padding-top: 125%;
    display: block;
    content:" "
  }
  .imageRatio img {
    height: 100%;
    position: absolute;
    top: 75%;
    right: 0;
    left: 0;
    transform: translateY(-75%)
  }
</style>
