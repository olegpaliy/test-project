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
                    <v-icon @click="deleteUser(item.id)"> mdi-delete </v-icon>
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

              <UsersDialog
                :isUserModalOpen="isUserModalOpen"
                :setModalVisible="setModalVisible"
                :editedItem="editedItem"
                :createOrEditUserHandler="createOrEditUserHandler"
                :setCreateUser="setCreateUser"
              />

              <v-dialog v-model="isDeleteModalOpen" width="300px">
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
                        isDeleteModalOpen = false;
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
                        removeUserHandler(deletedId);
                        isDeleteModalOpen = false;
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
import UsersDialog from "./UsersDialog.vue";
export default {
  components: {
    UsersDialog,
  },
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    removeUserHandler: {
      type: Function,
      required: true,
    },
    saveUserHandler: {
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

    checkUserModal: {
      get() {
        return this.isUserModalOpen;
      },
      set(val) {
        console.log("here");
        if (!val) {
          this.editedItem = { ...this.defaultItem };
        }
        this.isUserModalOpen = val;
      },
    },
  },
  data() {
    return {
      isUserModalOpen: false,
      isDeleteModalOpen: false,
      deletedId: null,
      isCreateUser: false,

      headers: [
        { text: "ID", value: "id", divider: true },
        { text: "Login", value: "login", divider: true },
        { text: "First Name", value: "firstName", divider: true },
        { text: "Last Name", value: "lastName", divider: true },
        { text: "Email", value: "email", divider: true },
        { value: "actions", sortable: false },
      ],

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
      this.checkUserModal = true;
      this.isCreateUser = true;
    },

    createOrEditUserHandler(item) {
      if (this.isCreateUser) {
        this.saveUserHandler(item);
      } else {
        this.editUserHandler(item);
      }
      this.checkUserModal = false;
      this.editedItem = { ...this.defaultItem };
    },

    deleteUser(id) {
      this.isDeleteModalOpen = true;
      this.deletedId = id;
    },

    editUser(user) {
      this.editedItem = { ...user };
      this.checkUserModal = true;
      this.isCreateUser = false;
    },

    setModalVisible(value) {
      this.isUserModalOpen = value;
      this.editedItem = { ...this.defaultItem };
    },

    setCreateUser(value) {
      this.isCreateUser = value;
    },
  },
};
</script>
