<template>
  <v-dialog v-model="authModal.modal" width="500">
    <v-card>
      <v-card-title>
        <span class="headline">{{ authModal.title }}</span>
      </v-card-title>
      <v-card-text>
        <div class="text-center">
          <img class="my-10" src="@/assets/auth.svg" alt="home image" width="50%" />
        </div>

        <v-row>
          <v-col cols="12" v-if="authModal.method === 'register'">
            <v-text-field v-model="auth.name" label="Name*" type="text" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="auth.email" label="Email*" type="email" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="auth.password" label="Password*" type="password" required></v-text-field>
            <v-checkbox
              v-if="authModal.method === 'register'"
              v-model="auth.role"
              label="Apply as a publisher"
            ></v-checkbox>
          </v-col>
        </v-row>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">Close</v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          text
          @click="submit(method)"
        >{{ authModal.method }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Auth',
  data: () => ({
    auth: {
      name: '',
      email: '',
      password: '',
      role: false
    },
    loading: false
  }),
  computed: {
    authModal() {
      return this.$store.getters.auth
    }
  },
  methods: {
    submit(method) {
      if (method === 'register') {
        this.loading = true
        this.$axios
          .post('/auth/register', {
            name: this.auth.name,
            email: this.auth.email,
            password: this.auth.password,
            role: this.auth.role ? 'publisher' : 'user'
          })
          .then(res => {
            this.closeDialog()
            this.loading = false
            localStorage.setItem('bootcamp_token', res.data.token)
            this.$store.dispatch('storeUser', res.data)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'success',
              text: `Account created! Welcome, ${res.data.data.name}.`
            })
          })
          .catch(err => {
            this.loading = false
            console.log(err)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'error',
              text: err.response.data.error
            })
          })
      } else {
        this.loading = true
        this.$axios
          .post('/auth/login', this.auth)
          .then(res => {
            this.closeDialog()
            localStorage.removeItem('bootcamp_token')
            localStorage.removeItem('vuex')
            localStorage.setItem('bootcamp_token', res.data.token)
            this.$store.dispatch('storeUser', res.data.data)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'success',
              text: `Logged in! Welcome, ${res.data.data.name}.`
            })
          })
          .catch(err => {
            this.loading = false
            console.error(err)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'error',
              text: err.response.data.error
            })
          })
      }
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
