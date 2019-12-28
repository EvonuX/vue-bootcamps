import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vuexPersist from './plugins/vuex-persist'
import axios from 'axios'

const http = axios.create({
  baseURL: 'https://devcampertest.herokuapp.com/api/v1'
})

Vue.prototype.$axios = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuexPersist,
  vuetify,
  render: h => h(App)
}).$mount('#app')
