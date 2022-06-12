import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-l
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: "#e4e5e6", // Not automatically applied #E8F5E9
        primary: "#20a8d8",
        secondary: "#fff",
        // primary: '#66BB6A'
      },
      dark: {
        // primary: colors.shades,
        primary: "#016b91",
        red: "#D32F2F",
        error: "#D32F2F",
      },
    },
    dark: false,
  },
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
});
