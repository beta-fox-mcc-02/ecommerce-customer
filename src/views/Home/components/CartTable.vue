<template>
  <v-data-table :headers="headers" :items="carts" sort-by="name" class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Cart</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- checkout -->
        <v-dialog v-model="checkout" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark class="mb-2" v-on="on">Checkout</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Confirm Purchase</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <p>Total Price is Rp. 2.000.000</p>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onCancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="onBuy">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- edit -->
        <v-dialog v-model="edit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Update Quantity</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Quantity" type="number" min="0" v-model="newQuantity"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onCancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="onUpdate">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- delete -->
        <v-dialog v-model="deleteModal" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Confirm Delete</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <p>Do you want to delete "{{itemToDelete.name}}"?</p>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onCancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="onDelete">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.price="data">{{ formatPrice(data.value)}}</template>
    <template v-slot:item.totalPrice="data">{{ formatPrice(data.value)}}</template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-3" @click="editItem(item)">fas fa-edit</v-icon>
      <v-icon small @click="deleteItem(item)">fas fa-trash</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CartTable",
  data: () => ({
    checkout: false,
    edit: false,
    deleteModal: false,
    headers: [
      {
        text: 'Product Name',
        sortable: false,
        value: 'name',
      },
      { text: 'Price (IDR)', value: 'price', key: 'price' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Total Price (IDR)', value: 'totalPrice' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    editedIndex: -1,
    newQuantity: '',
    updateValue: '',
    itemToDelete: '',
  }),

  computed: {
    carts() {
      return this.$store.state.carts;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.dispatch('fetchCarts');
    },

    editItem(item) {
      this.newQuantity = item.quantity;
      this.updateValue = item;
      this.edit = true;
    },

    deleteItem(item) {
      this.deleteModal = true;
      this.itemToDelete = item;
    },

    onCancel() {
      this.checkout = false;
      this.deleteModal = false;
      this.edit = false;
    },

    onBuy() {
      this.checkout = false;
    },

    onUpdate() {
      const payload = {
        id: this.updateValue.id,
        data: {
          status: this.updateValue.status,
          quantity: this.newQuantity,
          ProductId: this.updateValue.ProductId
        }
      };
      this.$store.dispatch('addItemToCart', payload)
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch('fetchCarts');
        })
        .catch(({ response }) => {
          console.log(response);
        });
      this.edit = false;
    },

    onDelete() {
      this.deleteModal = false;
      console.log(this.itemToDelete);
    },
    formatPrice(price) {
      return `Rp ${price.toLocaleString('id-ID', 'currency')}`;
    }
  },
}
</script>