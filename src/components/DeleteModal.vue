<template>
  <div>
      <b-modal title="Delete Confirmation" v-model="isShow">
        <div class="d-block">Are you sure want to delete this product ?</div>
        <template v-slot:modal-footer>
          <b-button size="md" variant="success" @click="deleteCart()">
            OK
          </b-button>
          <b-button size="md" variant="danger" @click="closeModal()">
            Cancel
          </b-button>
        </template>
      </b-modal>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  data: () => {
    return {
      isShow: false
    }
  },
  props: {
    show: Boolean,
    id: Number,
    cart: Number
  },
  methods: {
    closeModal () {
      this.$emit('closeModal', false)
    },
    deleteCart () {
      this.$store.dispatch('deleteCartDetail', { cart_id: this.cart, cart_detail_id: this.id })
        .then(response => {
          this.$store.dispatch('fetchCarts', { cart_id: this.cart })
            .then(response => {
              this.$store.commit('SET_CART', response.data)
              this.$emit('closeModal', false)
              this.$store.commit('SET_LOADING_CART', false)
            })
            .catch(err => {
              this.$store.commit('SET_ERRORS', err.response)
              this.$store.commit('SET_LOADING_CART', false)
            })
        })
        .catch(err => {
          this.$store.commit('SET_ERRORS', err.response)
          this.$store.commit('SET_LOADING_CART', false)
        })
    }
  },
  watch: {
    show (value) {
      this.isShow = value
    }
  }
}
</script>
