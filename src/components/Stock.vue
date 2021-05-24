<template>
  <div class="mt-4">
    <v-container>
      <v-row>
        <v-col>
          <template>
            <v-data-table
              :headers="headers"
              :items="desserts"
              sort-by="calories"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>My STOCK</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        New Machine
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Machine Name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.location"
                                label="Location"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.balance"
                                label="balance"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item, (saveEdited = true))"
                >
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="GetMachine">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { GetAllMachine, UpdateMachine, CreateMachine } from "../api/index";
export default {
  data: () => ({
    saveEdited: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Location", value: "location" },
      { text: "balance", value: "balance" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      location: "",
      balance: 0,
    },
    defaultItem: {
      name: "",
      location: "",
      balance: 0,
    },
  }),
  computed: {
    ...mapState(["machineData"]),
    formTitle() {
      return this.editedIndex === -1 ? " New Machine" : "Edit Machine";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.GetMachine();
    // this.initialize();
  },

  methods: {
    ...mapActions(["setMachineData"]),
    async GetMachine() {
      try {
        const res = await GetAllMachine();
        const result = res.data;
        console.log("result = ", result);
        this.desserts = result;
      } catch (error) {
        console.log(error);
      }
    },

    async UpdateMachine(item) {
      const payload = {
        name: item.name,
        balance: item.balance,
        countStock: item.countStock,
        location: item.location,
        usercount: item.usercount,
      };
      console.log("item._id = ", payload);
      try {
        const res = await UpdateMachine(item._id, payload);
        const result = res.data;
        console.log("result =", result);
      } catch (error) {
        console.log(error);
      }
    },
    async CreateMachine(item) {
      const payload = {
        name: item.name,
        balance: item.balance,
        countStock: 1,
        location: item.location,
        usercount: 1,
      };

      try {
        const res = await CreateMachine(payload);
        const result = res.data;
        console.log("result =", result);
      } catch (error) {
        console.log(error);
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      console.log("this.editedIndex =", this.editedIndex);
      this.editedItem = Object.assign({}, item);
      console.log("editedItem = ", this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);

      // } else {
      //   console.log('else case');
      //   this.desserts.push(this.editedItem);
      // }
      // this.close();
      console.log("this.editedItem =", this.editedItem);
      console.log("this.saveEdited", this.saveEdited);
      if (this.saveEdited) {
        console.log("เข้านี่ if !!!");
        this.UpdateMachine(this.editedItem);
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.setMachineData(this.desserts);
        this.saveEdited = false;
      }
      if (!this.saveEdited) {
        this.CreateMachine(this.editedItem);
        this.desserts.push(this.editedItem)
        this.setMachineData(this.desserts);
      }
      this.close();
    },
  },
};
</script>

<style></style>
