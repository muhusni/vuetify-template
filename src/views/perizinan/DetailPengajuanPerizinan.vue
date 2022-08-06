<template>
    <v-card elevation="2">
        <v-card-title> Detail Perizinan </v-card-title>
        <v-card-subtitle> Detail Perizinan yang diajukan </v-card-subtitle>
        <v-card-text>
            <HeaderPermohonan />
            <DetilPermohonan />
        </v-card-text>
    </v-card>
</template>
<script>
import HeaderPermohonan from './components/HeaderPermohonan.vue'
import DetilPermohonan from './components/DetilPermohonan.vue'
export default {
    components: {
        HeaderPermohonan, DetilPermohonan
    }
}
</script>