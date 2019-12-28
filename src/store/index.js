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
    isLoggedIn: false
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
    }
  },
  actions: {
    storeUser({ commit }, user) {
      commit('changeUser', user)
      user ? commit('changeAuthState', true) : commit('changeAuthState', false)
    },
    updateUser({ commit }, payload) {
      commit('updateUser', payload)
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getAuthState(state) {
      return state.isLoggedIn
    }
  },
  plugins: [vuexLocal.plugin]
})
