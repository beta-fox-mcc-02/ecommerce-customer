<template>
<form>
    <div class="products">
        <h3 class="title">Checkout</h3>
        <div class="item" v-for="(item, index) in cartItem" :key="index">
        <div class="d-flex justify-content-between">
            <p class="item-name">{{ item.name }}</p><span class="price">
                {{ 'Rp. ' + Number(item.price).toLocaleString('id') }}/pcs</span>
        </div>
        <div class="d-flex justify-content-between align-items-lg-center"
            style="margin-top: 5px;">
        <p class="item-description">Stock: {{ item.stock }}</p>
        <input type="number" class="form-control" value="quantity"
            style="width: 70px;height: 30px;" min="0" :max="item.stock" />
        </div>
        <div class="d-flex justify-content-between justify-content-lg-end"><button
            class="btn btn-primary" type="submit"
            style="width: 70px;height: 29px;font-size:
            16px;padding: 0px;margin: 0px;margin-top: 6px;">
            Buy</button>
        </div>
        <div class="total"><span>Total</span>
        <span class="price">{{ 'Rp. ' + Number(item.price).toLocaleString('id') }}</span></div>
        </div>
    </div>
</form>
</template>

<script>
export default {
  computed: {
    cartItem() {
      return this.$store.state.cart;
    },
  },
  created() {
    console.log(this.cartItem);
  },
};
</script>
