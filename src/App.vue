<template>
  <v-app>
    <Navbar class="desktopNav" />
    <Drawer class="mobileNav" />
    <v-content>
      <div class="text-center loader" v-if="loading">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <router-view class="mt-5"></router-view>
    </v-content>
    <v-snackbar
      v-model="snackbar.snackbar"
      :bottom="true"
      :right="true"
      :color="snackbar.color"
      class="text-center"
    >{{ snackbar.text }}</v-snackbar>
    <Auth
      v-if="auth.show"
      :method="auth.method"
      :title="auth.title"
      :modal="auth.modal"
      @closeDialog="closeDialog"
    />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Drawer from './components/Drawer'
import Auth from './components/Auth'

export default {
  name: 'App',
  components: { Navbar, Drawer, Auth },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar
    },
    loading() {
      return this.$store.getters.loading
    },
    auth() {
      return this.$store.getters.auth
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('authModal', { show: false })
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

.mobileNav {
  display: none;
}

@media screen and (max-width: 768px) {
  .mobileNav {
    display: block;
  }
  .desktopNav {
    display: none;
  }
}
</style>
