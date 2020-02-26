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
      <div id="checkout-item">
        <div id="checkout-title">
          <h1> {{transaction.username}}'s items </h1>
        </div>
        <ul id="cart">
          <li class="checkout-details" v-for="product in transaction.Products" v-bind:key="product.id">
            <h3>{{product.name}}</h3>
            <p>Rp.{{product.Transaction.purchasePrice.toLocaleString()}}</p>
            <p>{{!product.Transaction.status ? 'Waiting for payment' : 'Bought'}}</p>
            <button v-if="!product.Transaction.status" v-on:click="pay(product.Transaction)">Pay now</button>
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
      username: localStorage.getItem('username')
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
    pay (transaction) {
      const payload = {
        customerId: transaction.CustomerId,
        productId: transaction.ProductId
      }
      this.$store.dispatch('payAsync', payload)
        .then((result) => {
          console.log(result.data)
          this.getTransaction()
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
    width: 50%;
    height: 7rem;
    display: flex;
    flex-direction: column;
    font-variant: all-petite-caps;
}

h3 {
    text-align: center;
    height: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    word-break: break-word;
    font-variant-caps: all-petite-caps;
}

</style>
