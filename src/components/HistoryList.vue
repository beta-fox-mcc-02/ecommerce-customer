<template>
  <div>
    <div class="main-container">
      <table border="1" id="products">
        <tr>
          <th>No</th>
          <th>Prouct name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tbody v-for="(cart, i) in $store.state.history" :key="cart.id">
          <tr>
            <td>{{ i + 1 }}</td>
            <td>{{ cart.Product.name }}</td>
            <td>
              <img
                :src="`${cart.Product.image_url}`"
                alt="img"
                class="table-image"
              />
            </td>
            <td>Rp. {{ cart.Product.price * cart.quantity }}</td>
            <td>{{ cart.quantity }}</td>
          </tr>
        </tbody>
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HistoryList',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        fetchAll() {
        this.loading = true;
        this.$store
            .dispatch("fetchHistory")
            .then(response => {
                // console.log(response.data)
                this.$store.commit("resetHistory");
                response.data.forEach(history => {
                    this.$store.commit("setHistory", history);
                });
                this.loading = false;
                })
            .catch(err => {
                this.loading = false
                console.log(err)
                } 
            );
        }
    },
    created(){
        this.fetchAll()
    }
}
</script>

<style>

</style>