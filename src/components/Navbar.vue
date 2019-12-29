<template>
  <v-app-bar app>
    <div class="d-flex align-center">
      <v-btn
        v-for="link in nav"
        :key="link.title"
        text
        class="mx-1"
        :to="link.link"
      >{{ link.title }}</v-btn>
    </div>

    <v-spacer></v-spacer>

    <div v-if="!isLoggedIn">
      <v-dialog v-model="register" width="500">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Register</v-btn>
        </template>

        <Auth
          @closeDialog="register = false"
          title="Register"
          method="register"
          :dialog="register"
        />
      </v-dialog>

      <v-dialog v-model="login" width="500">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Login</v-btn>
        </template>

        <Auth @closeDialog="login = false" title="Login" method="login" :dialog="login" />
      </v-dialog>
    </div>
    <div v-else>
      <v-btn class="mx-1" exact text to="/account">Account</v-btn>
      <v-btn class="mx-1" exact text to="/dashboard">Dashboard</v-btn>
      <v-btn class="mx-1" exact text @click="logout">Logout</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import Auth from '@/components/Auth'

export default {
  name: 'Navbar',
  components: { Auth },
  data: () => ({
    register: false,
    login: false,
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
    }
  }
}
</script>
