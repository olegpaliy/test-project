<template>
  <v-dialog persistent v-model="modalOpen" width="300px">
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
            setDeleteModal(false);
            getDeletedId('');
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
            setDeleteModal(false);
          "
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDeleteModalOpen: {
      type: Boolean,
      required: true,
    },
    getDeletedId: {
      type: Function,
      required: true,
    },
    removeUserHandler: {
      type: Function,
      required: true,
    },
    setDeleteModal: {
      type: Function,
      required: true,
    },
    deletedId: {
      type: String,
      required: true,
    },
  },

  computed: {
    modalOpen: {
      get() {
        return this.isDeleteModalOpen;
      },
    },
  },
};
</script>

<style></style>
