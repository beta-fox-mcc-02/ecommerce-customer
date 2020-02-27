<template>
<main class="page payment-page">
    <br><br>
  <section class="clean-block payment-form dark">
    <div class="container">
      <div class="block-heading">
        <h2 class="text-info">Payment</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim
          nec auctor in, mattis vitae leo.</p>
      </div>
      <!-- <form>
        <div class="products">
          <h3 class="title">Checkout</h3>
          <div class="item">
            <div class="d-flex justify-content-between">
              <p class="item-name">Product 1</p><span class="price">$200/pcs</span>
            </div>
            <div class="d-flex justify-content-between align-items-lg-center"
              style="margin-top: 5px;">
              <p class="item-description">Stock: 5</p><input type="number" class="form-control"
                style="width: 70px;height: 30px;" min="0" />
            </div>
            <div class="d-flex justify-content-between justify-content-lg-end"><button
                class="btn btn-primary" type="submit"
        style="width: 70px;height: 29px;font-size: 16px;padding: 0px;margin: 0px;margin-top: 6px;">
        Buy</button>
            </div>
            <div class="total"><span>Total</span><span class="price">$320</span></div>
          </div>
        </div>
      </form> -->
      <checkout-form />
    </div>
  </section>
</main>
</template>

<script>
import CheckoutForm from '../components/CheckoutForm.vue';

export default {
  components: {
    CheckoutForm,
  },
  computed: {
    cartItem() {
      return this.$store.state.cart;
    },
  },
};
</script>
