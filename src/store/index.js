import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import perizinan from './perizinan'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingModal: false,
    isLoadingCard: false,
    snackbar: false,
    snackbarData: {
      message: '',
      status: ''
    }
  },
  mutations: {
    SET_LOADING_MODAL(state, payload) {
      state.isLoadingModal = payload
    },
    SET_LOADING_CARD(state, payload) {
      state.isLoadingCard = payload
    },
    SET_SNACKBAR(state, payload) {
      state.snackbar = payload.active
      state.snackbarData.message = payload.message
      state.snackbarData.status = payload.status
    }
  },
  actions: {
  },
  modules: {
    auth, perizinan
  }
})
