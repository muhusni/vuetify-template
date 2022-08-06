<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Home </v-card-title>
      <v-card-subtitle> Beranda </v-card-subtitle>
      <v-card-text class="">
        <p>
          Selamat datang di Aplikasi
        </p>
        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores a ex aspernatur necessitatibus,
          provident quae laboriosam consectetur reprehenderit eaque ipsa sequi exercitationem ipsam at molestiae atque
          iure nihil eligendi dignissimos.</p>
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
