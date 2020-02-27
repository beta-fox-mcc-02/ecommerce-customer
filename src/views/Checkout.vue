<template>
  <div id="checkout-container">
    <span> {{notification}} </span>
    <div id="checkout-content">
      <form v-on:submit.prevent="checkout">
        <div class="checkout-inputs">
          <label>Purchase Quantity</label>
          <input type="number" v-model="stock">
        </div>
        <div class="checkout-inputs">
          <button type="submit">checkout</button>
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
      stock: 0,
      showNotif: '',
      notification: ''
    }
  },
  props: ['product'],
  watch: {
    $route () {
      this.stock = 0
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
  methods: {
    checkout () {
      const token = localStorage.getItem('token')
      if (token) {
        const payload = {
          token,
          itemId: this.itemId,
          stock: this.stock
        }
        this.$store.dispatch('checkoutAsync', payload)
          .then((result) => {
            if (result) {
              const token = localStorage.getItem('token')
              this.$store.dispatch('getTransactionAsync', token)
              this.$store.dispatch('fetchProductsAsync')
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            } else {
              this.showNotif = true
              this.notification = 'Quantity inappropriate'
              setTimeout(() => {
                this.showNotif = false
                this.notification = ''
              }, 3000)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else this.$router.push('/registration')
    }
  },
  created () {
    this.stock = 0
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
    position: relative;
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

span {
    font-size: 15pt;
    position: absolute;
    bottom: 10.8rem;
    right: 0;
    color: #cc2e2e;
    text-shadow: 0 0 0.2rem #a7a7a7;
}

</style>
