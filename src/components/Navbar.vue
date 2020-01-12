<template>
  <v-app-bar app color="primary">
    <div class="d-flex align-center">
      <v-btn
        v-for="link in nav"
        :key="link.title"
        text
        color="white"
        class="mx-1"
        :to="link.link"
      >{{ link.title }}</v-btn>
    </div>

    <v-spacer></v-spacer>

    <div v-if="!isLoggedIn">
      <v-btn color="white" text @click="showRegister">Register</v-btn>
      <v-btn color="white" text @click="showLogin">Login</v-btn>
    </div>
    <div v-else>
      <v-btn color="white" class="mx-1" exact text to="/account">Account</v-btn>
      <v-btn
        color="white"
        v-if="user.role === 'publisher'"
        class="mx-1"
        exact
        text
        to="/dashboard"
      >Dashboard</v-btn>
      <v-btn color="white" class="mx-1" exact text @click="logout">Logout</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    register: false,
    login: false,
    drawer: false,
    nav: [
      { title: 'Home', link: '/' },
      { title: 'Bootcamps', link: '/bootcamps' },
      { title: 'Courses', link: '/courses' }
    ]
  }),
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    isLoggedIn() {
      return this.$store.getters.getAuthState
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('bootcamp_token')
      localStorage.removeItem('vuex')
      this.$store.dispatch('storeUser', null)
      this.$router.push('/')
    },
    showLogin() {
      this.$store.commit('authModal', {
        show: true,
        modal: 'login',
        method: 'login',
        title: 'Login'
      })
    },
    showRegister() {
      this.$store.commit('authModal', {
        show: true,
        modal: 'register',
        method: 'register',
        title: 'Register'
      })
    }
  }
}
</script>
