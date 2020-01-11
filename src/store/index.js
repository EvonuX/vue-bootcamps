import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const ignoreMutations = ['updateSnackbar']

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  filter: mutation => !ignoreMutations.includes(mutation.type)
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
    },
    loading: false,
    auth: {
      show: false,
      modal: 'login',
      method: 'login',
      title: 'Login'
    }
  },
  mutations: {
    changeAuthState(state, payload) {
      state.isLoggedIn = payload
    },
    updateUser(state, payload) {
      state.user = payload
    },
    updateSnackbar(state, payload) {
      state.notification = payload
    },
    changeLoading(state, payload) {
      state.loading = payload
    },
    authModal(state, payload) {
      state.auth = payload
    }
  },
  actions: {
    storeUser({ commit }, user) {
      commit('updateUser', user)
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
    },
    loading(state) {
      return state.loading
    },
    auth(state) {
      return state.auth
    }
  },
  plugins: [vuexLocal.plugin]
})
