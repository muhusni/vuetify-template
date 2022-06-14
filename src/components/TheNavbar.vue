<template>
  <div>
    <v-navigation-drawer app clipped v-model="drawer" dark>
      <!-- -->
      <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app clipped-left elevate-on-scroll outlined color="secondary">
      <!-- <v-app-bar-nav-icon> -->
      <v-img class="d-none d-md-flex" max-width="100" height="35" src="@/assets/iconIonBeta.jpeg">
      </v-img>
      <!-- </v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Aplikasi Anya</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-text>
        <div class="d-none d-md-block "><b>KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM</b><br>
          <font style="font-size: 12px;">TELEPON (0778) 458818, 458263; FAKSIMILI (0778) 458149;SURAT ELEKTRONIK
            kpubcbatam@kemenkeu.go.id
          </font>
        </div>
        <v-img class="d-flex d-sm-flex d-md-none" max-width="100" height="35" src="@/assets/iconIonBeta.jpeg">
        </v-img>
      </v-text>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn icon @click="toggle_dark_mode" v-if="this.$vuetify.theme.dark" title="Switch to light mode">
        <v-icon>mdi-brightness-7</v-icon>
      </v-btn>
      <v-btn icon @click="toggle_dark_mode" v-else title="Switch to dark mode">
        <v-icon>mdi-brightness-3</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Dropdown
          </v-btn> -->
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item style="cursor: pointer" @click="logout()" link>
            <!-- <v-list-item-title @click="logout()" link></v-list-item-title> -->
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template> 
<script>
import Sidebar from "./TheSidebar";
import { mapActions } from "vuex";

export default {
  data: () => ({
    drawer: null,
    group: null,
    mini: false
  }),
  components: {
    Sidebar,
  },
  mounted() {
    console.log(localStorage.getItem("dark_theme"));
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    ...mapActions({
      signOut: "auth/logout",
    }),
    logout() {
      this.signOut().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
  },
};
</script>