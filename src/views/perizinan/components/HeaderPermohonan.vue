<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card flat>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>NPWP</td>
                <td> {{ headerPermohonan.npwp }}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>{{ headerPermohonan.NM_PERUSAHAAN }}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td></td>
              </tr>
              <tr>
                <td>No HP/Telepon</td>
                <td> {{ headerPermohonan.no_hp }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ headerPermohonan.email }}</td>
              </tr>
              <tr>
                <td>Jenis Perizinan</td>
                <td>{{ headerPermohonan.nama_ijin }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card flat>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Status</td>
                <td>
                  <v-chip :color="getColor(headerPermohonan.status)">
                    {{ headerPermohonan.ur_status }}
                  </v-chip>
                </td>
              </tr>
              <tr>
                <td>Nomor Persetujuan</td>
                <td>{{ headerPermohonan.no_setuju }}</td>
              </tr>
              <tr>
                <td>Tanggal Persetujuan</td>
                <td>{{ headerPermohonan.tgl_setuju }}</td>
              </tr>
              <tr>
                <td>Kantor</td>
                <td>020400 - KPU BC Tipe B Batam</td>
              </tr>
              <tr>
                <td>Nomor Permohonan</td>
                <td>{{ headerPermohonan.no_mohon }}</td>
              </tr>
              <tr>
                <td>Tanggal Permohonan</td>
                <td>{{ headerPermohonan.tgl_mohon }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      headerPermohonan: {}
    }
  },
  created () {
    this.getHeaderPermohonan()
  },
  methods: {
    getHeaderPermohonan () {
      this.$store.commit('SET_LOADING_CARD', true)
      var data = {
        user: this.$store.getters['auth/user']['username'],
        idmohon: this.$route.params.id
      }
      this.user = data
      axios.post('dtlheader', data)
        .then(response => {
          this.headerPermohonan = response.data
          this.$store.commit('SET_LOADING_CARD', false)
        })
    },
    getColor (status) {
      if (status >= "20" && status < "50") return this.$vuetify.theme.currentTheme.warning
      else if (status === "90") return this.$vuetify.theme.currentTheme.error
      else if (status === "50") return this.$vuetify.theme.currentTheme.success
      else return null
    },
  }
}
</script>