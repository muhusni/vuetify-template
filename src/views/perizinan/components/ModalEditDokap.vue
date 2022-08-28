<template>
    <v-dialog v-model=" $store.state.perizinan.ModalEdit.dialog " persistent max-width="600px"
        :fullscreen=" $vuetify.breakpoint.xsOnly ">
        <!-- <template v-slot:activator=" {on,attrs} ">
            <v-btn color="primary" dark v-bind=" attrs " v-on=" on " icon>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template> -->
        <v-card :loading=" $store.state.isLoadingModal " :disabled=" $store.state.isLoadingModal ">
            <v-form ref="form">
                <v-card-title>
                    <span class="text-h5">Edit Dokumen Pelengkap</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="4">
                                <v-text-field label="Nama Dokap"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click=" $store.commit( 'perizinan/SET_MODAL_EDIT',false ) ">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click=" handleSubmit ">
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

            rules: {
                required: (value) => !!value || "Wajib diisi.",
            }
        }
    },
    created () {

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
            // if (this.$refs.form.validate()) {
            //     this.$store.commit('SET_LOADING_MODAL', true)
            //     // this.$http.post('savepengajuan', this.pengajuan)
            //         .then(response => {
            //             this.dialog = false
            //             this.$store.commit('SET_SNACKBAR', {active: true, message: response.data.message, status: response.data.status})
            //             this.$store.commit('SET_LOADING_MODAL', false)
            //             // this.$parent.$parent.getPengajuan()
            //             // swal(response.data.status, response.data.message, response.data.status).then(() => {
            //             //     if (response.data.status === 'success') {
            //             //         this.$router.push('/pengajuan')
            //             //     }
            //         }).catch((error) => {
            //             this.$store.commit('SET_SNACKBAR', {active: true, message: error.message, status: 'error'})
            //             this.$store.commit('SET_LOADING_MODAL', false)
            //         })
            // }
        }
    }
}
</script>