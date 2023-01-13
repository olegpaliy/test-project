<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title> My CRUD </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="inputAccounts"
                class="elevation-10"
                hide-default-footer
                :items-per-page="-1"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon color="primary">
                    <v-icon class="mr-2" @click="editUser(item)">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="red darken-2">
                    <v-icon @click="deleteItem(item.id)"> mdi-delete </v-icon>
                  </v-btn>
                </template>

                <template v-slot:[`footer`]>
                  <v-divider></v-divider>
                  <v-container fluid>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click="createNewUser"
                    >
                      New Item
                    </v-btn>
                  </v-container>
                </template>
              </v-data-table>

              <v-dialog v-model="userDialog" width="500px">
                <v-alert
                  v-model="validForm"
                  border="top"
                  colored-border
                  type="info"
                  elevation="2"
                >
                  Please enter a valid information
                </v-alert>
                <v-card>
                  <v-card-title></v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Login" v-model="editedItem.login">
                        </v-text-field>
                        <v-text-field
                          label="First Name"
                          v-model="editedItem.firstName"
                        >
                        </v-text-field>
                        <v-text-field
                          label="Last Name"
                          v-model="editedItem.lastName"
                        >
                        </v-text-field>
                        <v-text-field
                          :rules="emailRules"
                          label="E-mail"
                          v-model="editedItem.email"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      @click="
                        userDialog = false;
                        isCreating = false;
                        validForm = false;
                      "
                      color="secondary"
                      class="mb-2"
                    >
                      Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="isCreateOrEdit" color="primary" class="mb-2">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="userDelete" width="300px">
                <v-card>
                  <v-card-text>
                    <v-card-text></v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <p>Are you sure?</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      color="secondary"
                      class="mb-2"
                      @click="
                        userDelete = false;
                        deletedId = null;
                      "
                    >
                      No
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="mb-2" @click="removeUser">
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    setAccounts: {
      type: Function,
    },
  },
  computed: {
    inputAccounts: {
      get() {
        return this.accounts;
      },
    },
  },
  data() {
    return {
      userDialog: false,
      userDelete: false,
      validForm: false,
      deletedId: null,
      isCreating: false,

      headers: [
        { text: "ID", value: "id", divider: true },
        { text: "Login", value: "login", divider: true },
        { text: "First Name", value: "firstName", divider: true },
        { text: "Last Name", value: "lastName", divider: true },
        { text: "Email", value: "email", divider: true },
        { text: "Actions", value: "actions", sortable: false },
      ],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      nameRules: [(v) => !!v || "Name is required"],

      editedItem: {
        login: "",
        firstName: "",
        lastName: "",
        email: "",
      },

      defaultItem: {
        login: "",
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },

  watch: {
    userDialog: function (newValue) {
      if (!newValue) {
        this.userDialog = newValue;
        this.editedItem = this.defaultItem;
      }
    },
  },

  methods: {
    createNewUser() {
      this.userDialog = true;
      this.isCreating = true;
    },

    isCreateOrEdit() {
      if (this.isCreating) {
        this.saveAccout();
      } else {
        this.editUserHandler();
      }
    },

    deleteItem(id) {
      this.userDelete = true;
      this.deletedId = id;
    },

    editUser(user) {
      this.editedItem = user;
      this.userDialog = true;
    },

    editUserHandler() {
      axios
        .put(`http://localhost:7777/${this.editedItem.id}`, this.editedItem)
        .then((response) => {
          const index = this.inputAccounts.findIndex(
            (item) => response.data.id === item.id
          );
          console.log(index);
          this.inputAccounts[index] = this.editedItem;
        });
      this.userDialog = false;
    },

    removeUser() {
      axios
        .delete(`http://localhost:7777/${this.deletedId}`)
        .then((response) => {
          if (response.status === 200) {
            this.setAccounts(this.deletedId);
          }
        });
      this.userDelete = false;
    },

    saveAccout() {
      if (
        this.editedItem.firstName &&
        this.editedItem.login &&
        this.editedItem.lastName &&
        this.editedItem.email
      ) {
        axios
          .post("http://localhost:7777/", this.editedItem)
          .then((response) => {
            this.inputAccounts.push(response.data);
            (this.editedItem.login = ""),
              (this.editedItem.firstName = ""),
              (this.editedItem.lastName = ""),
              (this.editedItem.email = "");
            this.userDialog = false;
            this.validForm = false;
          });
      } else {
        this.validForm = true;
        return;
      }
    },
  },
};
</script>
