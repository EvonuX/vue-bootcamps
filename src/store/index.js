import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    notification: {
      snackbar: false,
      color: '',
      text: ''
    }
  },
  mutations: {
    changeUser(state, payload) {
      state.user = payload
    },
    changeAuthState(state, payload) {
      state.isLoggedIn = payload
    },
    updateUser(state, payload) {
      state.user = payload
    },
    updateSnackbar(state, payload) {
      state.notification = payload
    }
  },
  actions: {
    storeUser({ commit }, user) {
      commit('changeUser', user)
      user ? commit('changeAuthState', true) : commit('changeAuthState', false)
    },
    updateUser({ commit }, payload) {
      commit('updateUser', payload)
    },
    setSnackbar({ commit }, payload) {
      commit('updateSnackbar', payload)
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getAuthState(state) {
      return state.isLoggedIn
    },
    getSnackbar(state) {
      return state.notification
    }
  },
  plugins: [vuexLocal.plugin]
})
