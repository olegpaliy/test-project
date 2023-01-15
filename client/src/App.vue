<template>
  <v-app>
    <v-main>
      <UsersTable
        :removeUserHandler="removeUserHandler"
        :accounts="accounts"
        :saveUserHandler="saveUserHandler"
        :editUserHandler="editUserHandler"
      />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import UsersTable from "./components/UsersTable";

export default {
  name: "App",

  components: {
    UsersTable,
  },

  data: () => ({
    accounts: [],
  }),

  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      axios.get("http://localhost:7777/").then((response) => {
        this.accounts = response.data;
      });
    },

    editUserHandler(editedItem) {
      axios
        .put(`http://localhost:7777/${editedItem.id}`, editedItem)
        .then((response) => {
          const index = this.accounts.findIndex(
            (item) => response.data.id === item.id
          );
          this.accounts.splice(index, 1, response.data);
        });
    },

    removeUserHandler(deletedId) {
      axios.delete(`http://localhost:7777/${deletedId}`).then((response) => {
        if (response.status === 200) {
          this.accounts = this.accounts.filter((item) => item.id !== deletedId);
        }
      });
    },

    saveUserHandler(editedItem) {
      axios.post("http://localhost:7777/", editedItem).then((response) => {
        this.accounts.push(response.data);
      });
    },
  },
};
</script>
