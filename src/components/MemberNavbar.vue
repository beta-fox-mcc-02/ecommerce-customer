<template>
  <div class="menu">
    <div id="user-profile">
      <a class="far fa-user-circle"></a>
      <span>
        <div id="user-profile-detail">
          <h1>HELLO</h1>
          <p style="font-style: italic">{{ username }}</p>
        </div>
        <button id="logout" v-on:click="logout">logout</button>
      </span>
    </div>
    <div id="shopping-cart">
      <a class="fas fa-shopping-cart"></a>
      <small v-if="cancelNotif" class="canceled" style="position: absolute;">{{cancelNotif}}</small>
      <div id="checkout-item">
        <div id="checkout-title">
          <h1> {{transaction.username}}'s items </h1>
        </div>
        <ul id="cart">
          <li class="checkout-details" v-for="detail in transaction.Transactions" v-bind:key="detail.id">
            <h4>{{detail.Product.name}}</h4>
            <div class="total-purchase">
              <p>Expected</p>
              <p class="totalpayment">Rp.{{detail.purchasePrice.toLocaleString()}}</p>
            </div>
            <div class="status">
              <p>{{!detail.status ? '' : 'Bought'}}</p>
              <button v-if="!detail.status" v-on:click="pay(detail)">Pay</button>
              <button v-if="!detail.status" v-on:click="cancel(detail)">cancel</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: localStorage.getItem('username'),
      cancelNotif: null
    }
  },
  computed: {
    transaction () {
      return this.$store.state.transaction
    }
  },
  methods: {
    logout () {
      this.$store.commit('clearAll')
      this.$store.dispatch('fetchProductsAsync')
      localStorage.clear()
    },
    getTransaction () {
      const token = localStorage.getItem('token')
      this.$store.dispatch('getTransactionAsync', token)
    },
    pay (detail) {
      const payload = {
        transactionId: detail.id,
        customerId: detail.CustomerId,
        productId: detail.Product.id
      }
      this.$store.dispatch('payAsync', payload)
        .then((result) => {
          this.getTransaction()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancel (detail) {
      const payload = {
        transactionId: detail.id,
        customerId: detail.CustomerId,
        productId: detail.Product.id,
        purchasePrice: detail.purchasePrice
      }
      this.$store.dispatch('cancelAsync', payload)
        .then((result) => {
          this.cancelNotif = `${detail.Product.name} returned!`
          setTimeout(() => {
            this.$store.dispatch('fetchProductsAsync')
            this.getTransaction()
            this.cancelNotif = null
          }, 2000)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getTransaction()
  }
}
</script>

<style scoped>

div {
    height: inherit;
}

.menu{
    display: flex;
    align-items: center;
}

a.far.fa-user-circle, a.fas.fa-shopping-cart {
    font-size: 20pt;
    height: inherit;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
}

a:hover{
  background-color: #374d69
}

div#user-profile, div#shopping-cart {
    position: relative;
}

div#user-profile:hover span {
    visibility: visible;
}

div#checkout-item {
    position: absolute;
    right: 0;
    width: 20rem;
    height: 20rem;
    overflow-y: scroll;
    word-break: break-word;
    background-color: white;
    box-shadow: 0 0 0.4rem grey;
    visibility: hidden;
    z-index: 1;
}

div#shopping-cart:hover #checkout-item {
  visibility: visible;
}

span {
    position: absolute;
    top: 3rem;
    left: -2.5rem;
    padding: 1rem;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 7rem;
}

div#user-profile-detail {
    height: 65%;
    text-align: center;
}

button#logout {
    text-align: center;
    height: 35%;
    font-size: 12pt;
    background-color: #a6d5fa;
    border-style: groove;
    border-radius: 0.2rem;
    color: #6d6d6d;
}

button#logout:hover {
  background-color: #8baec9
}

div#checkout-title {
    height: 10%;
    text-align: center;
    background-color: #3ca4a9;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-variant-caps: petite-caps;
}

div#checkout-product {
    height: 20%;
}

ul#cart {
    display: flex;
    list-style: none;
    padding: 0.5rem;
    justify-content: flex-start;
    flex-wrap: wrap;
}

li.checkout-details {
    width: 100%;
    height: 5rem;
    margin: 0.1rem 2%;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    font-variant: all-petite-caps;
    border: 0.01rem solid #3ca4a9;
}

.status, .total-purchase {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 0 0.3rem;
    box-sizing: content-box;
    align-items: center;
    justify-content: center;
}

.total-purchase{
  width: 40%;
}

h4 {
    width: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    word-break: break-word;
    font-variant-caps: all-petite-caps;
    font-family: monospace;
    font-size: 16pt;
}

p {
    font-family: monospace;
    font-size: 15pt;
}

.totalpayment {
    font-size: 12pt;
}

button {
    width: 3rem;
    padding: 0;
}

small.canceled {
    background-color: #ffa602;
    padding: 0.5rem 1rem;
    font-size: 12pt;
    color: black;
    z-index: 2;
    top: 5rem;
    right: 1rem;
    border-radius: 0.5rem;
    -webkit-box-shadow: 0 0 0.3rem grey;
    box-shadow: 0 0 0.3rem grey;
}

</style>
