<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Dashboard </v-card-title>
      <v-card-subtitle> Dasbor </v-card-subtitle>
      <v-card-text>
        <v-card-title>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-data-table dense :headers="headers" :items="brows.data" :items-per-page="5" :search="search"
          :loading="isLoading" class="elevation-1" loading-text="Loading... Please wait"></v-data-table>
        <!-- <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nama Perusahaan</th>
                <th class="text-left">Tgl Mohon</th>
                <th>Tgl Kirim</th>
                <th>No Mohon</th>
                <th>Tgl Setuju</th>
                <th>No Setuju</th>
                <th>Status</th>
                <th>Jenis Izin</th>
                <th>Action</th>
                <th>Fl</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mohon in brows" :key="mohon.id_permohonan">
                <td>{{ mohon.NM_PERUSAHAAN }}</td>
                <td>{{ mohon.tgl_mohon }}</td>
                <td>{{ mohon.wk_kirim }}</td>
                <td>{{ mohon.no_mohon }}</td>
                <td>{{ mohon.tgl_setuju }}</td>
                <td>{{ mohon.no_setuju }}</td>
                <td>{{ mohon.ur_status }}</td>
                <td>{{ mohon.nama_ijin }}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      tes: "",
      brows: [],
      search: '',
      isLoading: true,
      headers: [
        {
          text: "Nama Perusahaan",
          align: "start",
          sortable: true,
          value: "NM_PERUSAHAAN",
        },
        { text: "Tgl Mohon", value: "tgl_mohon" },
        { text: "Waktu Kirim", value: "wk_kirim" },
        { text: "No. Mohon", value: "no_mohon" },
        { text: "Tgl. Setuju", value: "tgl_setuju" },
        { text: "No. Setuju", value: "no_setuju" },
        { text: "Status", value: "ur_status" },
        { text: "Jenis Izin", value: "nama_ijin" },
      ],
    };
  },
  mounted() {
    this.fungsi();
    this.getBrows();
  },
  methods: {
    fungsi() {
      axios.get("/posts").then((response) => {
        this.tes = response.data;
      });
    },
    getBrows(page) {
      if (typeof page === "undefined") {
        page =
          "brows/listv2";
      }
      var auth = {
        user: "muhamad.husni.001",
        q: "",
        p: "",
        a: "",
        b: "",
        c: "perijinan.td_permohonan.id_permohonan",
        d: "desc",
      };
      axios.post(page, auth).then((response) => {
        this.brows = response.data;
        this.isLoading = false;
      });
    },
  },
};
</script>
