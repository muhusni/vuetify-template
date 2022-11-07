import axios from 'axios'
import router from '@/router'
// import swal from 'sweetalert'
// import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    isLoading: false,
    loginAlert: null
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    },
    SET_LOADING (state, isLoading) {
      state.isLoading = isLoading
    },

    SET_LOGIN_ALERT (state, alert) {
      state.loginAlert = alert
    }
  },
  getters: {
    authenticated (state) {
      if (state.user && state.token) {
        return true;
      } else {
        return false;
      }
    },
    user (state) {
      return state.user
    },
    isLoading (state) {
      return state.isLoading
    },
    loginAlert (state) {
      return state.loginAlert
    }
  },

  actions: {
    async login ({dispatch, commit}, credentials) {
      await commit('SET_LOADING', true)
      commit('SET_LOGIN_ALERT', null)
      await axios.post('auth-amws/v1/user/login', credentials).then(function (response) {
        // console.log(response)
        // setTimeout(() => {, 5000)})
        // setTimeout(() => {
        // console.log(response.data.item.access_token)
        // }, 500)
        // commit('SET_TOKEN', response.data.item.access_token)
        // commit('SET_USER', response.data.item.id_token)
        return dispatch('attempt', response.data.item.access_token)
      }).catch(error => {
        console.log(error)
        commit('SET_LOADING', false)
        commit('SET_LOGIN_ALERT', true)
      })
    },

    async attempt ({state, commit}, token) {
      // console.log(token)
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }

      // try {
      //   await axios.get('/openapi/manifes-bc11?noHostBl=AFW0232224&tglHostBl=20-08-2022&kodeKantor=040300&nama=PT').then(function (response) {
      //     commit('SET_USER', response.data)
      //   })
      //   //    .catch( error => {
      //   //        // swal('error', 'Email/Password yang ada masukan salah', 'error')
      //   //        commit('SET_USER', null)
      //   //        commit('SET_TOKEN', null)
      //   //        router.push({ path: 'login' })
      //   //      }
      //   //    )
      // } catch (e) {
      //   commit('SET_USER', null)
      //   commit('SET_TOKEN', null)
      //   router.push({path: 'login'})
      // }
      commit('SET_USER', token)

    },
    async logout ({commit}) {
      // if (state.token == null) {
      //   router.push({path: 'login'})
      // }
      // return await axios.post('logout').then(() => {
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
      router.push({path: 'login'})
      //   // Vue.$toast.info('Berhasil Logout')
      // })
    }
  }
}
