<template>
    <v-card :isloading="$store.state.isloadingCard">
        <v-card-title> Pengajuan Perizinan </v-card-title>
        <v-card-text class="d-flex justify-end">
            <ModalPengajuan />
        </v-card-text>
        <v-card-text>
            <v-data-table :headers="headers" :items="Aju" :items-per-page="5" :search="search" :loading="!Aju.length"
                class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :to="'/pengajuan/' + item.id_permohonan" v-bind="attrs" v-on="on" text icon>
                                <v-icon color="primary"> mdi-pencil </v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Pengajuan</span>
                    </v-tooltip>
                    <v-btn @click.stop="handleDelete(item.id_permohonan)" text icon>
                        <v-icon color="error"> mdi-delete </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card-text>
        <!-- <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn> -->
        <v-row justify="center">
            <v-dialog v-model="dialogDelete" max-width="290">
                <v-card>
                    <v-card-title :loading="$store.state.isloadingModal" :disabled="$store.state.isloadingModal"
                        class="text-h5">
                        Hapus dokumen ini?
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="" @click="dialogDelete = false">
                            Batal
                        </v-btn>
                        <v-btn color="error" @click="deletePermohonan(deleteId)">
                            Hapus
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-card>
</template>
<script>
import ModalPengajuan from './components/ModalPengajuan.vue'
// import ModalDeletePengajuan from './components/ModalDeletePengajuan.vue'
import axios from 'axios'
export default {
    components: {
        ModalPengajuan,
        // ModalDeletePengajuan
    },
    data () {
        return {
            dialog: true,
            dialogDelete: false,
            deleteId: '',
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
    created () {
        this.getPengajuan()
    },
    methods: {
        getPengajuan () {
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
        handleDelete (id) {
            this.deleteId = id
            this.dialogDelete = true
        },
        deletePermohonan (id) {
            var data = {
                user: this.$store.getters['auth/user']['username'],
                delid: id
            }
            this.$store.commit('SET_LOADING_MODAL', true)
            axios.post('delete', data)
                .then(response => {
                    this.getPengajuan()
                    this.$store.commit('SET_LOADING_MODAL', false)
                    this.$store.commit('SET_SNACKBAR', { active: true, message: response.data.message, status: response.data.status })
                    this.dialogDelete = false
                })
        }
    }
}
</script>