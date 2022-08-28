<template>
  <v-card class="mt-3">
    <v-card-title>
      Dokumen Pelengkap
    </v-card-title>
    <v-simple-table class="dokap">
      <thead>
        <tr>
          <th :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">Nama Dokumen</th>
          <th :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">Nomor</th>
          <th :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">Tanggal</th>
          <th :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">Keterangan</th>
          <th :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dokap in dokapPermohonan" :key=" dokap.id_permohonan_dokap ">
          <td :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">{{ dokap.nama_dokap}}</td>
          <td :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">{{ dokap.isian1}}</td>
          <td :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">{{ dokap.isian2}}</td>
          <td :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">{{
              dokap.keterangan
          }}</td>
          <td :style=" {'border-left': '1px solid ' + $vuetify.theme.currentTheme.border} ">
            <!--a :href="'http://192.168.16.5/backper/public/' + dokap.url_file + '/' + dokap.nm_file" target="_blank" class="btn btn-warning"><i class="fa fa-download"></i></a-->
            <!-- <a v-if="dokap.url_file !== null" :href="'http://perijinanbcbatam.beacukai.go.id/repository/perijinanbatam/' + dokap.url_file + '/' + dokap.nm_file" target="_blank" class="btn btn-warning"><i class="fa fa-download"></i></a> -->
            <!-- <button title="Edit Dokumen/Data Pelengkap" v-if="dokap.kd_dokap === 151" type="button"
          @click="opendtl(dokap.id_permohonan_dokap)" class="btn btn-success"><i class="fa fa-eye"></i></button> -->
            <!-- <a v-if="dokap.url_file !== null" :href="'http://103.233.145.212/backper/public' + dokap.url_file + '/' + dokap.nm_file" target="_blank" class="btn btn-warning"><i class="fa fa-download"></i></a> -->
            <v-btn color="primary" dark @click.stop=" $store.commit( 'perizinan/SET_MODAL_EDIT',true ) " icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <a v-if=" dokap.url_file !== null " :href=" dokap.url_file " target="_blank" class="btn btn-warning">
              <v-btn color="success" icon>
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </a>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <ModalEditDokap />
  </v-card>
</template>
<script>
import axios from "axios"
import ModalEditDokap from "./ModalEditDokap.vue"
export default {
  data () {
    return {
      dokapPermohonan: [],
      dialog: false
    }
  },
  components: {
    ModalEditDokap
  },
  created () {
    this.getDokapPermohonan()
  },
  methods: {
    getDokapPermohonan () {
      var data = {
        user: this.$store.getters['auth/user']['username'],
        idijin: this.$route.params.id // idmohon maksudnya
      }
      axios.post('dokap', data)
        .then(response => {
          this.dokapPermohonan = response.data
        })
    },
  }
}
</script>
<style>
/* .dokap table th+th {
  border-left: 1px solid #dddddd;
}

.dokap table td+td {
  border-left: 1px solid var(--v-primary-base);
} */

/* .v-data-table__divider {
  border-left: 1px solid var(--v-primary-base);
} */
</style>