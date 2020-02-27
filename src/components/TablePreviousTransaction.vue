<template>
  <div>
    <h1>Transaction History</h1>
    <b-table
      style="max-width: 750px; margin:auto"
      small
      :items="paidProduct"
      :fields="fields"
      responsive="sm"
    >

      <template v-slot:cell(image_url)="data">
        <img v-if="!data.item.image_url" src="https://static.thenounproject.com/png/340719-200.png" alt="">
        <img v-if="data.item.image_url" v-bind:src="data.item.image_url" alt="">
      </template>

      <template v-slot:cell(price)="data">
        Rp. {{ data.item.price.toLocaleString() }}
      </template>

      <template v-slot:cell(quantity)="data">
        {{ data.item.Cart.quantity }}
      </template>

      <template v-slot:cell(total)="data">
        Rp. {{ data.item.Cart.price.toLocaleString() }}
      </template>

      <!-- <template v-slot:cell(updatedAt)="data">
        
      </template> -->
    </b-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fields: [
        {
          key: 'image_url',
          label: '',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'price',
          label: 'Price',
        },
        {
          key: 'quantity',
          label: 'Quantity',
        },
        {
          key: 'total',
          label: 'Total',
        },
      ],
      selected: [],
      quantity: 0,
      editModal: {
        id: 'edit-modal',
        productId: '',
        stock: '',
      },
    };
  },
  computed: {
    personData() {
      return this.$store.state.personData;
    },
    paidProduct() {
      return this.$store.getters.paidProduct;
    },
    totalPrice() {
      let result = 0;
      this.selected.forEach((item) => {
        result += item.Cart.price;
      });
      return result;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    resetAll() {
      this.resetError();
      this.resetInput();
    },
    resetError() {
      this.$store.commit('setError', '');
    },
    resetInput() {
      this.quantity = 0;
    },
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    edit(item, index, button) {
      this.editModal.productId = item.Cart.ProductId;
      this.editModal.stock = item.stock;
      this.quantity = item.Cart.quantity;
      this.$root.$emit('bv::show::modal', this.editModal.id, button);
    },
    editQuantity() {
      const payload = {
        PersonId: localStorage.person_id,
        ProductId: this.editModal.productId,
        quantity: this.quantity,
      };
      this.$store.dispatch('editCart', payload)
        .then(() => {
          this.$store.commit('showAlert', {
            successMessage: 'Cart is Successfully Updated',
            interval: 2000,
          });
          return this.$store.dispatch('fetchUserData', localStorage.person_id);
        })
        .then((response) => {
          this.$store.commit('setLogin', response.data);
        })
        .catch((err) => {
          console.log(err.response);
          const error = Array.isArray(err.response.data.error)
            ? err.response.data.error[0] : err.response.data.error;
          this.$store.commit('setError', error);
        })
        .finally(() => {
          this.$store.commit('stopLoading');
        });
    },
    deleteProduct(id) {
      const payload = {
        PersonId: localStorage.person_id,
        ProductId: id,
      };
      this.$store.dispatch('deleteCart', payload)
        .then(() => {
          this.$store.commit('showAlert', {
            successMessage: 'Product is Removed From Cart',
            interval: 2000,
          });
          return this.$store.dispatch('fetchUserData', localStorage.person_id);
        })
        .then((response) => {
          this.$store.commit('setLogin', response.data);
        })
        .catch((err) => {
          console.log(err.response);
          const error = Array.isArray(err.response.data.error)
            ? err.response.data.error[0] : err.response.data.error;
          this.$store.commit('setError', error);
        })
        .finally(() => {
          this.$store.commit('stopLoading');
        });
    },
    checkoutSelected() {
      const allPromises = [];
      if (this.selected.length) {
        this.selected.forEach((product) => {
          allPromises.push(this.$store.dispatch('checkoutCart', product.Cart));
        });
        Promise.all(allPromises)
          .then(() => {
            this.$store.commit('showAlert', {
              successMessage: 'Checkout is Success',
              interval: 2000,
            });
            return this.$store.dispatch('fetchUserData', localStorage.person_id);
          })
          .then((response) => {
            this.$store.commit('setLogin', response.data);
            this.$store.dispatch('fetchListOfProducts');
          })
          .catch((err) => {
            console.log(err.response);
          })
          .finally(() => {
            this.$store.commit('stopLoading');
          });
      }
    },
  },
};
</script>

<style>
table img {
  width: 80px;
}
.footer {
  max-width: 750px;
  margin: 0 auto;
  text-align: right;
  background: lightgoldenrodyellow;
  padding: 20px 40px;
}
.footer h5 {
  font-weight: 700;
}
.button-custom{
  margin: auto 15px;
}
</style>
