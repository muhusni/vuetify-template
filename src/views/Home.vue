<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Home </v-card-title>
      <v-card-subtitle> Beranda </v-card-subtitle>
      <v-card-text>
        <p>
          Selamat datang di Aplikasi Perizinan Online Beacukai Batam
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      // tes: this.$store.getters['auth/user']
    }
  },
  mounted () {
    // this.fungsi()
  },
  methods: {
    // fungsi () {
    // axios.get('/posts').then((response) => {
    //   this.tes = response.data})}
  }
}
</script>
