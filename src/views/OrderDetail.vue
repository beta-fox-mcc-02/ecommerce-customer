<template>
  <div class="container">
    <h1 class="title">Your History Details</h1>
    <div class="card" v-for="item in transactionDetails" :key="item.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="item.image_url" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <p class="title is-6">{{ item.productName }}</p>
                <p class="subtitle is-6">Qty: {{ item.quantity }}</p>
              </div>
              <div class="column">
                <p class="title is-6">
                  Total
                </p>
                <p class="subtitle is-6">
                  {{ formatIDR(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'TransactionDetails',
  created: function() {
    // panggil api
    this.$store
      .dispatch('getOrderDetails', this.$route.params.id)
      .then(tran => {
        console.log(tran)
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    transactionDetails: function() {
      return this.$store.getters.transactionDetails
    }
  },
  methods: {
    formatIDR: function(money) {
      let reverse = money
        .toString()
        .split('')
        .reverse()
        .join('')
      let ribuan = reverse.match(/\d{1,3}/g)
      ribuan = ribuan
        .join('.')
        .split('')
        .reverse()
        .join('')
      return 'Rp. ' + ribuan
    }
  }
}
</script>
