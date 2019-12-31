<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar
      v-model="snackbar.snackbar"
      :bottom="true"
      :right="true"
      :color="snackbar.color"
      class="text-center"
    >{{ snackbar.text }}</v-snackbar>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar
    }
  }
}
</script>
