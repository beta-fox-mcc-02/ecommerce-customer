<template>
  <div>
    <md-card class="my-2" style="background: rgba(0,0,0,.3)">
      <md-card-content>
        <b-row>
          <b-col md="8" sm="12" style="padding-right: 0">
            <ItemOnCart />
          </b-col>
          <b-col md="4" sm="12">
            <md-card class="innercard">
              <md-card-header>
                <div class="md-title mb-4" style="font-size: 2rem;">TOTAL</div>
              </md-card-header>
              <md-card-content style="font-size: 1.2rem;" class="pb-0">
                QUANTITY
              </md-card-content>
              <md-card-content style="font-size: 1.2rem;">
                3
              </md-card-content>
              <md-card-content style="font-size: 1.2rem;" class="pb-0 pt-4">
                TOTAL PRICE
              </md-card-content>
              <md-card-content style="font-size: 1.2rem;">
                1000000
              </md-card-content>
              <md-card-content>
                <form>
                  <md-field>
                    <label style="margin-left: 10px;">Voucher Code</label>
                    <md-input v-model="voucherCode" style="padding: 10px; background: rgba(0,0,0,.2);"></md-input>
                    <b-button variant="success" size="sm" style="margin-left: 10px; width: 100px;" type="submit">USE</b-button>
                  </md-field>
                </form>
              </md-card-content>
              <md-card-content style="padding-top: 0">
                <b-button variant="primary">CHECKOUT</b-button>
              </md-card-content>
            </md-card>
          </b-col>
        </b-row>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import ItemOnCart from '@/components/itemOnCart'

export default {
  name: 'Cart',
  data () {
    return {
      voucherCode: ''
    }
  },
  components: {
    ItemOnCart
  }
}
</script>

<style scoped>
  .md-card {
    width: 95vw;
    display: inline-block;
    vertical-align: top;
  }
  .innercard {
    width: 100%;
    background: rgba(0,0,0,.5);
    margin-bottom: 1rem;
    color:powderblue;
  }
</style>
