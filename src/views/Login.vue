<template>
  <v-app :style=" {background: $vuetify.theme.themes[theme].background} ">
    <v-card elevation="" width="450" class="ma-auto justify-center" :loading=" loading " :disabled=" loading ">
      <v-img class="align-end" height="200px" src="@/assets/anya.jpg">
        <v-card-title>Sign In</v-card-title>
      </v-img>
      <!-- <v-card-title class="justify-center mt-5"> Login </v-card-title> -->
      <!-- <v-card-subtitle>  </v-card-subtitle> -->
      <v-card-text>
        <v-alert class="px-3" v-if=" alert " type="error" dismissible dense outlined>Email/Password yang anda masukan
          salah</v-alert>
        <v-form ref="form" @submit.prevent=" submit " method="POST">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field :color=" this.$vuetify.theme.dark ? 'secondary' : 'primary' " label="Email"
                  v-model=" form.username " :rules=" [rules.required] " counter>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field :color=" this.$vuetify.theme.dark ? 'secondary' : 'primary' " v-model=" form.password "
                  :append-icon=" show ? 'mdi-eye' : 'mdi-eye-off' " :rules=" [rules.required,rules.min] "
                  :type=" show ? 'text' : 'password' " name="input-10-1" label="Password" hint="At least 6 characters"
                  counter @click:append=" show = !show "></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn :color=" this.$vuetify.theme.dark ? 'secondary' : 'primary' " elevation="2" block type="submit"
                  :class=" this.$vuetify.theme.dark ? 'primary--text' : 'secondary--text' " raised>LOGIN</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Home",
  components: {},
  data () {
    return {
      form: {
        username: "userdemoscs",
        password: "Scs123456",
      },
      show: false,
      // isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  mounted () {
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
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
    loading () {
      return this.$store.getters["auth/isLoading"];
    },
    alert () {
      return this.$store.getters["auth/loginAlert"];
    },
    theme () {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      handleClick: "handleClick",
    }),
    goRegister () {
      this.$router.push({path: "register"});
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.login(this.form)
          .then(() => {
            this.$store.commit("auth/SET_LOADING", false);
            this.$router.push({path: "/"});

          })
      }
      // this.$refs.form.validate(
      // )
      // // this.isLoading = true
      // //   setTimeout(() => (this.isLoading = false), 2000);
    },
  },
};
</script>
