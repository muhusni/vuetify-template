<template>
    <v-card :isloading="$store.state.isloadingCard">
        <v-card-title> Pengajuan </v-card-title>
        <v-card-text class="d-flex justify-end">
            <ModalPengajuan />
        </v-card-text>
        <v-card-text>
            <v-data-table :headers="headers" :items="Aju" :items-per-page="5" :search="search" :loading="!Aju.length"
                class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:item.actions="{ item }">
                    <v-btn :to="'/pengajuan/' + item.id_permohonan" text icon>
                        <v-icon color="primary"> mdi-pencil </v-icon>
                    </v-btn>

                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script>
import ModalPengajuan from './components/ModalPengajuan.vue'
export default {
    components: {
        ModalPengajuan
    },
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            Aju: [],
            search: '',
            headers: [
                {
                    text: "Nama Perusahaan",
                    align: "start",
                    sortable: true,
                    value: "NM_PERUSAHAAN",
                },
                { text: "No. Mohon", value: "no_mohon" },
                { text: "Tgl Mohon", value: "tgl_mohon" },
                { text: "Jenis Izin", value: "nama_ijin" },
                { text: "Status", value: "ur_status" },
                { text: "Aksi", value: "actions" }
            ],
        }
    },
    created() {
        this.getPengajuan()
    },
    methods: {
        getPengajuan() {
            this.$store.commit('SET_LOADING_CARD', true)
            var auth = {
                user: this.$store.getters['auth/user']['username']
            }
            this.$http.post('pengajuanftz', auth)
                .then(response => {
                    this.Aju = response.data
                    this.$store.commit('SET_LOADING_CARD', false)
                })
        },
    }
}
</script>