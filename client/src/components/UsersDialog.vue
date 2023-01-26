<template>
  <v-dialog persistent v-model="isOpened" width="500px">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Login" v-model="account.login"></v-text-field>
            <v-text-field
              label="First Name"
              v-model="account.firstName"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="account.lastName"
            ></v-text-field>
            <v-text-field
              label="E-mail"
              v-model="account.email"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="
            setModalVisible(false);
            setCreateUser(false);
          "
          color="secondary"
          class="mb-2"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="createOrEditUserHandler(account)"
          color="primary"
          class="mb-2"
          :disabled="!validFormDialog"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    editedItem: {
      type: Object,
      required: true,
    },

    setModalVisible: {
      type: Function,
      required: true,
    },

    isUserModalOpen: {
      type: Boolean,
      required: true,
    },
    createOrEditUserHandler: {
      type: Function,
      required: true,
    },
    setCreateUser: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => this.pattern.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    account() {
      return this.editedItem;
    },
    isOpened: {
      get() {
        return this.isUserModalOpen;
      },
      set() {},
    },
    validFormDialog() {
      return (
        this.account &&
        this.account.login &&
        this.account.firstName &&
        this.account.lastName &&
        this.account.email &&
        this.pattern.test(this.account.email)
      );
    },
  },
};
</script>

<style></style>
