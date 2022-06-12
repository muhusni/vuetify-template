<template>
  <!-- <v-list>
    <v-list-item link to="/">
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>

      <v-list-item-title>Home</v-list-item-title>
    </v-list-item>
    <v-list-item link to="/about">
      <v-list-item-icon>
        <v-icon>mdi-account-question</v-icon>
      </v-list-item-icon>

      <v-list-item-title>Tentang</v-list-item-title>
    </v-list-item>
    <v-list-item link to="/browse">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Browse</v-list-item-title>
      </v-list-item>
    <v-list-group :value="false" v-for="menu in menus" :key="menu.id" :prepend-icon="menu.icon" no-action color="light">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ menu.nama_menu }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item v-for="sub in menu.submenus" :key="sub.id" :value="true" :to="sub.url" link>
        <v-list-item-icon>
            <v-icon v-text="sub.icon"></v-icon>
          </v-list-item-icon>
        <v-list-item-title v-text="sub.nama_submenu"></v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list> -->
  <v-list>
    <template v-for="menu in list">
      <v-list-item v-if="!menu.dropdown" link :to="menu.url" :key="menu.name">
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ menu.name }}</v-list-item-title>
      </v-list-item>
      <v-list-group v-if="menu.dropdown" :value="false" :prepend-icon="menu.icon" :key="menu.name" color="light">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ menu.name }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item class="ml-4" sub-group v-for="sub in menu.submenu" :key="sub.name" :value="true" :to="sub.url"
          link>
          <v-list-item-icon>
            <v-icon>{{ sub.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="sub.name"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import listSidebar from './Sidebar'
export default {
  data() {
    return {
      menus: this.$store.getters["auth/user"]["menus"],
      list: listSidebar // 
    };
  },
  // data: () => ({

  // }),
};
</script>