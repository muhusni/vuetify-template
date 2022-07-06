<template>
  <v-row justify="center">
    <v-dialog v-model="dialogDelete" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Hapus dokumen ini?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="dialog = false">
            Batal
          </v-btn>
          <v-btn color="error" @click="dialog = false">
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    dialogDelete: false
  },
  data () {
    return {
      dialog: false,
    }
  },
}
</script>