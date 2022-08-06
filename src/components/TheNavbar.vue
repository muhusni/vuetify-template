<template>
  <div>
    <v-navigation-drawer clipped app v-model="drawer">
      <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app elevate-on-scroll clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Documentation App</v-toolbar-title>

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
        <template v-slot:activator="{on, attrs}">
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
import {mapActions} from "vuex";

export default {
  data: () => ({
    drawer: null,
    group: null,
    mini: false
  }),
  components: {
    Sidebar,
  },
  mounted () {
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
    logout () {
      this.signOut().then(() => {
        this.$router.push({path: "/login"});
      });
    },
  },
};
</script>