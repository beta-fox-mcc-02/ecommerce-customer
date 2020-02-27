<template>
  <div>
    <h1>Shopping Cart</h1>
    <b-table
      style="max-width: 750px; margin:auto"
      small
      ref="selectableTable"
      selectable
      select-mode="multi"
      :items="notPaidProduct"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>

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

      <template v-slot:cell(action)="data">
        <b-button
        size="sm"
        @click="edit(data.item, data.index, $event.target)"
        class="mr-1">
          Edit
        </b-button>
        <b-button
        @click.prevent="deleteProduct(data.item.id)"
        variant="danger"
        size="sm">
          Remove
        </b-button>
      </template>
    </b-table>
    <b-modal
    centered
    v-b-modal.modal-sm
    :id="editModal.id"
    title=""
    hide-footer
    @hide="resetAll">
      <div style="display: flex; justify-content: center;">
        <div>
          <label style="font-weight: 700;margin: auto 15px">Stock: {{ editModal.stock }}</label>
          <!-- <label style="margin: auto 15px" for="sb-inline">Quantity</label> -->
          <b-form-spinbutton
          id="sb-inline"
          v-model="quantity"
          inline
          :max="editModal.stock">
          </b-form-spinbutton>
        </div>
        <br>
        <b-button @click="editQuantity()" style="margin: auto 10px" variant="secondary">
          Edit
        </b-button>
      </div>
    </b-modal>
    <div class="footer">
      <h5>Total: Rp. {{ totalPrice.toLocaleString() }}</h5>
    </div>
    <p>
      <b-button class="button-custom" size="sm" @click="selectAllRows">Select all</b-button>
      <b-button class="button-custom" size="sm" @click="clearSelected">Clear selected</b-button>
      <b-button variant="success"
      class="button-custom"
      size="sm"
      @click="checkoutSelected">
      Check Out
      </b-button>
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fields: [
        {
          key: 'selected',
          label: '',
        },
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
        {
          key: 'action',
          label: 'Action',
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
    notPaidProduct() {
      return this.$store.getters.notPaidProduct;
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
