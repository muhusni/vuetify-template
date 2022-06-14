import axios from "axios";
// import router from "@/router";
// import swal from 'sweetalert'
// import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    kdid: [],
    jenisIzin: []
  },
  mutations: {
    SET_KDID(state, payload) {
      state.kdid = payload
    },
    SET_JENIS_IZIN(state, payload) {
      state.jenisIzin = payload
    }
  },
  getters: {},
  actions: {
    getID({ commit }) {
      axios.get('ref/kdid')
        .then(response => {
          commit('SET_KDID', response.data)
        })
    },
    getJenisIzin({ commit }) {
      axios.get('ref/jnijin')
        .then(response => {
          commit('SET_JENIS_IZIN', response.data)
        })
    },
  },
};
