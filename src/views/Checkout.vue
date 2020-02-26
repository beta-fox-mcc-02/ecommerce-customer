<template>
  <div id="checkout-container">
    <div id="checkout-content">
      <form>
        <div class="checkout-inputs">
          <label>Purchase Quantity</label>
          <input type="number" v-model="stock">
        </div>
        <div class="checkout-inputs">
          <button>checkout</button>
        </div>
        <div class="total-purchase">
          Rp.{{(item.price * stock).toLocaleString()}}
        </div>
        <div class="remaining-stock">
          {{(item.stock - stock).toLocaleString()}} unit Available
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {},
      itemId: '',
      stock: 1
    }
  },
  props: ['product'],
  watch: {
    $route () {
      this.stock = 1
      this.itemId = this.$route.params.itemId
      this.$store.dispatch('getItem', this.itemId)
        .then((result) => {
          this.item = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.stock = 1
    this.itemId = this.$route.params.itemId
    this.$store.dispatch('getItem', this.itemId)
      .then((result) => {
        this.item = result.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

div#checkout-container {
    width: 24%;
    height: 75%;
}

div#checkout-content {
    height: 100%;
    display: flex;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
}

.total-purchase {
    margin: 1rem 0;
}

</style>
