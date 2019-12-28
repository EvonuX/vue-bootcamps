<template>
  <v-app-bar app dark>
    <div class="d-flex align-center">
      <v-btn text dark to="/">Home</v-btn>
      <v-btn text dark to="/about">About</v-btn>
    </div>

    <v-spacer></v-spacer>

    <div v-if="!isLoggedIn">
      <v-dialog v-model="register" width="500">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">Register</v-btn>
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
          <v-btn text dark v-on="on">Login</v-btn>
        </template>

        <Auth @closeDialog="login = false" title="Login" method="login" :dialog="login" />
      </v-dialog>
    </div>
    <div v-else>
      Welcome {{ user.name }}
      <v-btn exact text dark to="/account">Account</v-btn>
      <v-btn exact text dark @click="logout">Logout</v-btn>
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
    login: false
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
