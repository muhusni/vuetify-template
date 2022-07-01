<template>
    <div class="home">
        <v-card elevation="2">
            <v-card-title> Browse </v-card-title>
            <v-card-subtitle> Browse Perizinan yang telah diajukan </v-card-subtitle>
            <v-card-text>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="brows" :footer-props="{
                    'items-per-page-options': [5, 10, 20, 50]
                }" :items-per-page="5" :search="search" :loading="!brows.length" class="elevation-1"
                    loading-text="Loading... Please wait">
                    <template v-slot:item.ur_status="{ item }">
                        <v-chip :color="getColor(item.status)">
                            {{ item.ur_status }}
                        </v-chip>
                        <v-chip v-if="(item.id_ijin == 27 || item.id_ijin == 30) && item.status == 50" small>{{
                                (item.id_ijin
                                    == 27 ||
                                    item.id_ijin == 30) && item.fl_setuju == 'Y' ?
                                    'Diperiksa' :
                                    ((item.id_ijin == 27 || item.id_ijin == 30) && item.fl_setuju == 'T' ? 'Tidak diperiksa' :
                                        '')
                        }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn :to="'/browse/' + item.id_permohonan" text icon>
                            <v-icon color="primary"> mdi-magnify </v-icon>
                        </v-btn>
                        <a target="_blank"
                            :href="'http://perizinanbcbatam.beacukai.go.id/backper/public/api/pdfBc/' + item.id_permohonan">
                            <v-btn v-if="item.status === '50'" text icon>
                                <v-icon color="success"> mdi-printer </v-icon>
                            </v-btn>
                        </a>
                    </template>
                </v-data-table>
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
                { text: "Aksi", value: "actions" }
            ],
        };
    },
    mounted() {
        // this.fungsi();
        this.getBrows();
    },
    methods: {
        // fungsi() {
        //     axios.get("/posts").then((response) => {
        //         this.tes = response.data;
        //     });
        // },
        getBrows(page) {
            if (typeof page === "undefined") {
                // page = "brows/listv2";
                page = 'bc/brows/browslist2'
            }
            var auth = {
                user: "tes",
                q: "",
                p: "",
                a: "",
                b: "",
                c: "perijinan.td_permohonan.id_permohonan",
                d: "desc",
            };
            axios.post(page, auth).then((response) => {
                this.brows = response.data;
            });
        },
        getColor(status) {
            if (status >= "20" && status < "50") return this.$vuetify.theme.currentTheme.warning
            else if (status === "90") return this.$vuetify.theme.currentTheme.error
            else if (status === "50") return this.$vuetify.theme.currentTheme.success
            else return null
        },
    },
};
</script>
