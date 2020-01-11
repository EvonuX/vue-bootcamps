<template>
  <v-app-bar app>
    <v-row xs12 align="center" justify="space-between">
      <span>Everlearn</span>
      <v-btn color="primary" text @click.stop="drawer = !drawer">Menu</v-btn>
    </v-row>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item v-if="isLoggedIn">
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="link in nav" :key="link.title" link :to="link.link">
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-if="isLoggedIn">
        <v-list-item link to="/account">Account</v-list-item>
        <v-list-item v-if="user.role === 'publisher'" link to="/dashboard">Dashboard</v-list-item>
        <v-list-item @click="logout" link to="/">Logout</v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item link @click="showLogin">Login</v-list-item>
        <v-list-item link @click="showRegister">Register</v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Drawer',
  data: () => ({
    drawer: false,
    nav: [
      { title: 'Home', link: '/' },
      { title: 'Bootcamps', link: '/bootcamps' },
      { title: 'Courses', link: '/courses' }
    ],
    userNav: [
      { title: 'Account', link: '/account' },
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Logout', link: '/' }
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