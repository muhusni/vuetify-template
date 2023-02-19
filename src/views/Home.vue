<template>
  <div class="home">
    <v-form ref="form" @submit.prevent="getLartas" method="POST">
      <v-card elevation="2" :loading="loading" :disabled="loading">
        <v-card-title> Home </v-card-title>
        <v-card-subtitle> Beranda </v-card-subtitle>
        <v-card-text class="">
          <p>
            Selamat datang di Aplikasi
          </p>
          <div class="mb-3">
            <v-text-field maxlength="8" :color=" this.$vuetify.theme.dark ? 'secondary' : 'primary' " label="Pos Tarif" v-model="kodeHS" :rules="rules" hide-details="auto"></v-text-field>
          </div>
          <v-btn type="submit" class="mr-3" :color="this.$vuetify.theme.dark ? 'secondary' : 'primary'"
            :class="this.$vuetify.theme.dark ? 'primary--text' : 'secondary--text'">Cari
          </v-btn>
          <v-btn :color="this.$vuetify.theme.dark ? 'primary' : 'secondary'"
            :class="this.$vuetify.theme.dark ? 'secondary--text' : 'primary--text'" @click="clearLartas">Clear
          </v-btn>
          <h3 class="mt-3">{{ tes.message }}</h3>
          <p class="mt-3 body-1" v-for="t in tes.posTarif" :key="t"> {{ t.kodeJenisPungutan + ': ' + t.tarif }}</p>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      tes: '',
      kodeHS: '85171100',
      rules: [
        value => !!value || 'Wajib diisi.',
        // value => (value && value.length >= 1) || 'Min 3 characters',
      ],
    }
  },
  mounted() {
    // this.fungsi()
  },
  methods: {
    getLartas() {
      if (this.$refs.form.validate()) {
        this.$store.commit("auth/SET_LOADING", true);
        axios.post('open/pos-tarif', { kodeHS: this.kodeHS }).then((response) => {
          console.log(response)
          this.$store.commit("auth/SET_LOADING", false);
          this.tes = response.data
        }).catch((error) => {
          console.log(error)
          this.$store.commit("auth/SET_LOADING", false);
          // this.tes = error.response.data.message[0].split(',')
        })
      }
    },
    clearLartas() {
      this.tes = ''
      this.kodeHS = ''
    }
  },
  computed: {
    loading() {
      return this.$store.getters["auth/isLoading"];
    },
  }
}
</script>
<style scoped>
.v-text-field {
  width: 400px;
}
</style>