<template>
  <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
    <button
      class="button field is-success"
      slot="trigger"
      role="button"
      style="margin: 15px 7px 0 0;"
    >
      <b-icon icon="cart"></b-icon>
      <span>Add to Cart</span>
    </button>
    <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
      <form method="post" @submit.prevent="addToCart">
        <div class="modal-card" style="width:200px;">
          <section class="modal-card-body">
            <b-field label="Add to cart">
              <b-input type="number" placeholder="amount" min="1" :max="stock" required v-model="amount"></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" router>Add</button>
          </footer>
        </div>
      </form>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  data () {
    return {
      amount: 0
    }
  },
  props: {
    id: Number,
    stock: Number,
    price: Number,
    name: String
  },
  methods: {
    addToCart () {
      const payload = {
        id: this.id,
        amount: this.amount,
        price: this.price
      }
      this.$store.dispatch('fetchAddCart', payload)
        .then(_ => {
          this.$buefy.toast.open({
            duration: 3000,
            message: 'success add ' + this.name + ' to your cart',
            position: 'is-top',
            type: 'is-success'
          })
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 3000,
            message: err.response.data.message,
            position: 'is-top',
            type: 'is-danger'
          })
        })
      this.amount = null
    }
  },
  computed: {
  }
}
</script>
