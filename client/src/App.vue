<template>
  <v-app>
    <v-main>
      <UsersTable :setAccounts="setAccounts" :accounts="accounts" />
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
    setAccounts(id) {
      this.accounts = this.accounts.filter((item) => item.id !== id);
    },
  },
};
</script>
