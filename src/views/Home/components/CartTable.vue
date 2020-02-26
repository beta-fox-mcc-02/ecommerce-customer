<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="name" class="elevation-2">
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
                    <v-text-field label="Quantity"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onCancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="onEdit">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- delete -->
        <v-dialog v-model="deleteModal" max-width="500px">
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
      </v-toolbar>
    </template>
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
      { text: 'Price', value: 'calories' },
      { text: 'Quantity', value: 'fat' },
      { text: 'Total Price', value: 'carbs' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
  }),

  computed: {
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
      this.desserts = [
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.edit = true;
    },

    deleteItem() {
      this.deleteModal = true;
      // const index = this.desserts.indexOf(item);
    },

    onCancel() {
      this.checkout = false;
      this.deleteModal = false;
      this.edit = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    onBuy() {
      this.checkout = true;
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
}
</script>