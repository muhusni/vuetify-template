<template>
  <div class="home">
    <v-card elevation="2" :loading=" loading " :disabled=" loading ">
      <v-card-title> Home </v-card-title>
      <v-card-subtitle> Beranda </v-card-subtitle>
      <v-card-text class="">
        <p>
          Selamat datang di Aplikasi
        </p>
        <v-btn class="mr-3" :color=" this.$vuetify.theme.dark ? 'secondary' : 'primary' "
          :class=" this.$vuetify.theme.dark ? 'primary--text' : 'secondary--text' " @click=" getLartas ">Click Me
        </v-btn>
        <v-btn :color=" this.$vuetify.theme.dark ? 'primary' : 'secondary' "
          :class=" this.$vuetify.theme.dark ? 'secondary--text' : 'primary--text' " @click=" clearLartas ">Clear
        </v-btn>
        <p>{{ tes}}</p>
        <p v-for="t in tes.posTarif" :key=" t "> {{ t.kodeJenisPungutan + ': ' + t.tarif}}</p>
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
      this.$store.commit("auth/SET_LOADING", true);
      axios.get('open/pos-tarif').then((response) => {
        console.log(response)
        this.$store.commit("auth/SET_LOADING", false);
        this.tes = response.data
      }).catch((error) => {
        console.log(error)
        this.$store.commit("auth/SET_LOADING", false);
        // this.tes = error.response.data.message[0].split(',')
      })
    },
    clearLartas () {
      this.tes = ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters["auth/isLoading"];
    },
  }
}
</script>
