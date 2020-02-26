<template>
  <div>
    <div class="image">
      <img :src="product.image_url">
    </div>
    <div class="named">
      <p>{{product.name}}</p>
      <p>{{product.price | currencyFormat}}</p>
    </div>
    <div class="add-to-cart">
      <button>Details</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemProduct',
  props: {
    product: Object
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  }
}
</script>

<style>
  .image {
    width: 100%;
  }
  .image img {
    width: 100%;
    height: 341px;
  }
  .add-to-cart {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .add-to-cart button {
    margin-bottom: 20px;
  }
</style>
