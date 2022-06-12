<template>
  <!-- App.vue -->

  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <Navbar />
    <!-- <Sidebar /> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <!-- <transition name="fade" mode="out-in"> -->
        <router-view :key="$route.path"></router-view>
        <!-- </transition> -->
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "./TheNavbar";
// import Sidebar from "./components/Sidebar";
export default {
  name: "Container",
  components: {
    Navbar,
    // Sidebar,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
