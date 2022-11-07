<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Home </v-card-title>
      <v-card-subtitle> Beranda </v-card-subtitle>
      <v-card-text class="">
        <p>
          Selamat datang di Aplikasi
        </p>
        <v-btn :color=" this.$vuetify.theme.dark ? 'secondary' : 'primary' "
          :class=" this.$vuetify.theme.dark ? 'primary--text' : 'secondary--text' " @click=" getLartas ">Click Me
        </v-btn>
        <p v-for="t in tes" :key=" t "> {{ t}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      tes: ''
    }
  },
  mounted () {
    // this.fungsi()
  },
  methods: {
    getLartas () {
      axios.post('openapi/document', {asalData: "S", kodeDokumen: "20"}).then((response) => {
        console.log(response)
        this.tes = response.data.message
      }).catch((error) => {
        this.tes = error.response.data.message[0].split(',')
      })
    },
    getLartas2 () {
      axios.get('openapi/tarif-hs?kodeHs=36069020&tanggal=2022-07-20').then((response) => console.log(response))
    }
  }
}
</script>
