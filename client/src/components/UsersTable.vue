<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title> My CRUD </v-card-title>
            <v-card-text>
              <v-data-table
                fixed-headers
                :headers="headers"
                :items="inputAccounts"
                class="elevation-10"
                hide-default-footer
                :items-per-page="-1"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon color="primary">
                    <v-icon @click="editUser(item)"> mdi-pencil </v-icon>
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
              <v-dialog v-model="checkUserDialog" width="500px">
                <v-card>
                  <v-card-title></v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Login"
                          v-model="editedItem.login"
                        ></v-text-field>
                        <v-text-field
                          label="First Name"
                          v-model="editedItem.firstName"
                        ></v-text-field>
                        <v-text-field
                          label="Last Name"
                          v-model="editedItem.lastName"
                        ></v-text-field>
                        <v-text-field
                          :rules="emailRules"
                          label="E-mail"
                          v-model="editedItem.email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      @click="
                        checkUserDialog = false;
                        isCreating = false;
                      "
                      color="secondary"
                      class="mb-2"
                    >
                      Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="isCreateOrEdit"
                      :disabled="!validFormDialog"
                      color="primary"
                      class="mb-2"
                    >
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
                    <v-btn
                      color="primary"
                      class="mb-2"
                      @click="
                        removeUser(deletedId);
                        userDelete = false;
                      "
                    >
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
export default {
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    removeUser: {
      type: Function,
      required: true,
    },
    saveAccout: {
      type: Function,
      required: true,
    },
    editUserHandler: {
      type: Function,
      required: true,
    },
  },
  computed: {
    inputAccounts: {
      get() {
        return this.accounts;
      },
    },
    validFormDialog() {
      return (
        this.editedItem.login &&
        this.editedItem.firstName &&
        this.editedItem.lastName &&
        this.editedItem.email &&
        this.pattern.test(this.editedItem.email)
      );
    },
    checkUserDialog: {
      get() {
        return this.userDialog;
      },
      set(val) {
        if (!val) {
          this.editedItem = { ...this.defaultItem };
        }
        this.userDialog = val;
      },
    },
  },
  data() {
    return {
      userDialog: false,
      userDelete: false,
      deletedId: null,
      isCreating: false,
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      headers: [
        { text: "ID", value: "id", divider: true },
        { text: "Login", value: "login", divider: true },
        { text: "First Name", value: "firstName", divider: true },
        { text: "Last Name", value: "lastName", divider: true },
        { text: "Email", value: "email", divider: true },
        { value: "actions", sortable: false },
      ],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => this.pattern.test(v) || "E-mail must be valid",
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

  methods: {
    createNewUser() {
      this.checkUserDialog = true;
      this.isCreating = true;
    },

    isCreateOrEdit() {
      if (this.isCreating) {
        this.saveAccout(this.editedItem);
        this.checkUserDialog = false;
      } else {
        this.editUserHandler(this.editedItem);
        this.checkUserDialog = false;
      }
    },

    deleteItem(id) {
      this.userDelete = true;
      this.deletedId = id;
    },

    editUser(user) {
      this.editedItem = user;
      this.checkUserDialog = true;
      this.isCreating = false;
    },
  },
};
</script>
