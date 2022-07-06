<template>
    <v-dialog v-model="dialog" persistent max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon> Tambah Baru
            </v-btn>
        </template>
        <v-card :loading="$store.state.isLoadingModal" :disabled="$store.state.isLoadingModal">
            <v-form ref="form">
                <v-card-title>
                    <span class="text-h5">Pengajuan Perizinan Baru</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="4">
                                <v-select :items="$store.state.perizinan.kdid" v-model="pengajuan.kdid"
                                    label="Jenis Identitas" item-text="URAIAN" item-value="kd_id"
                                    :rules="[rules.required]"
                                    :disabled="!(this.$store.getters['auth/user']['ppjk'] === 'Y')">
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="12" md="8">
                                <v-text-field label="No Identitas" v-model="pengajuan.idper" :rules="[rules.required]"
                                    :disabled="!(this.$store.getters['auth/user']['ppjk'] === 'Y')">
                                </v-text-field>
                            </v-col>
                            <v-col cols=" 12" sm="12">
                                <v-text-field label="Nama Perusahaan" type="text" v-model="pengajuan.pernama"
                                    :rules="[rules.required]"
                                    :disabled="!(this.$store.getters['auth/user']['ppjk'] === 'Y')">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-textarea name="input-7-4" label="Alamat Pemohon" :rules="[rules.required]"
                                    v-model="pengajuan.peralamat" flat
                                    :disabled="!(this.$store.getters['auth/user']['ppjk'] === 'Y')"></v-textarea>
                            </v-col>
                            <v-col cols=" 12" sm="6">
                                <v-text-field label="Nomor Permohonan" type="text" v-model="pengajuan.nomohon"
                                    :rules="[rules.required]"
                                    :disabled="!(this.$store.getters['auth/user']['ppjk'] === 'Y')">
                                </v-text-field>
                            </v-col>
                            <v-col cols=" 12" sm="6">
                                <v-text-field label="Tanggal Permohonan" type="date" v-model="pengajuan.tglmohon"
                                    :rules="[rules.required]"
                                    :disabled="!(this.$store.getters['auth/user']['ppjk'] === 'Y')">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-autocomplete :items="$store.state.perizinan.jenisIzin" label="Jenis Perizinan"
                                    item-text="nama_ijin" item-value="id_ijin" v-model="pengajuan.idijin"
                                    :rules="[rules.required]">
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="handleSubmit">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

    </v-dialog>
</template>
<script>
export default {
    data () {
        return {
            dialog: false,
            pengajuan: {
                idijin: '',
                nomohon: '',
                tglmohon: '',
                kdid: this.$store.getters['auth/user']['kdid'],
                idper: this.$store.getters['auth/user']['npwp'],
                pernama: this.$store.getters['auth/user']['NM_PERUSAHAAN'],
                peralamat: this.$store.getters['auth/user']['AL_PERUSAHAAN'],
                nohp: '',
                email: this.$store.getters['auth/user']['email'],
                jnsdok: '',
                idrekam: this.$store.getters['auth/user']['username']
            },
            rules: {
                required: (value) => !!value || "Wajib diisi.",
            }
        }
    },
    created () {
        if (!this.$store.state.perizinan.kdid.length) {
            this.$store.dispatch('perizinan/getID')
        }
        if (!this.$store.state.perizinan.jenisIzin.length) {
            this.$store.dispatch('perizinan/getJenisIzin')
        }
    },
    methods: {
        // handleSubmit() {
        //     this.$store.commit('SET_LOADING_MODAL', true)
        //     setTimeout(() => {
        //         this.$store.commit('SET_SNACKBAR', { snackbar: false, message: null, status: null })
        //         this.$store.commit('SET_LOADING_MODAL', false)
        //         this.dialog = false
        //     }, 3000)
        // },
        handleSubmit () {
            if (this.$refs.form.validate()) {
                this.$store.commit('SET_LOADING_MODAL', true)
                this.$http.post('savepengajuan', this.pengajuan)
                    .then(response => {
                        this.dialog = false
                        this.$store.commit('SET_SNACKBAR', { active: true, message: response.data.message, status: response.data.status })
                        this.$store.commit('SET_LOADING_MODAL', false)
                        this.$parent.$parent.getPengajuan()
                        // swal(response.data.status, response.data.message, response.data.status).then(() => {
                        //     if (response.data.status === 'success') {
                        //         this.$router.push('/pengajuan')
                        //     }
                    }).catch((error) => {
                        this.$store.commit('SET_SNACKBAR', { active: true, message: error.message, status: 'error' })
                        this.$store.commit('SET_LOADING_MODAL', false)
                    })
            }
        }
    }
}
</script>