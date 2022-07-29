import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import "regenerator-runtime/runtime";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
require("./store/subcriber");

// axios.defaults.baseURL = 'http://localhost/backend-laravel/public/api'
// axios.defaults.baseURL = 'http://localhost:8000/api'
// axios.defaults.baseURL = "http://localhost/backper/public/api";
// axios.defaults.baseURL = "http://192.168.1.8/backper/public/api";
axios.defaults.baseURL = "https://perizinanbcbatam.beacukai.go.id/backper/public/api";
axios.defaults.headers.common["X-CSRF-TOKEN"] = null;
router.beforeEach((to, from, next) => {
  // let tes = store.state.auth.token
  // store.dispatch('auth/attempt', localStorage.getItem('token'))
  // let tes = store.state.auth.token
  let tes = store.getters["auth/authenticated"];
  // console.log('ini pas reload kan?')
  // console.log(tes)
  // setTimeout(() => { let tes =store.getters.['auth/authenticated'] }, 2000);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (tes) {
      next();
      // console.log('udah dapet token')
    } else {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
      // console.log('gak ada tokennya')
    }
  } else if (to.matched.some((record) => record.meta.unrequiredAuth)) {
    if (tes) {
      next({
        path: "/home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
