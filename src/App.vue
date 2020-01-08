<template>
  <v-app>
    <Navbar />
    <v-content>
      <div class="text-center loader" v-if="loading">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <router-view class="mt-5"></router-view>
    </v-content>
    <v-snackbar v-model="snackbar.snackbar" :bottom="true" :right="true" :color="snackbar.color" class="text-center">{{ snackbar.text }}</v-snackbar>
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
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss">
.loader {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
