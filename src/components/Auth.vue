<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <div class="text-center">
        <img class="my-10" src="@/assets/auth.svg" alt="home image" width="50%" />
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" v-if="method === 'register'">
            <v-text-field v-model="auth.name" label="Name*" type="text" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="auth.email" label="Email*" type="email" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="auth.password" label="Password*" type="password" required></v-text-field>
            <v-checkbox v-if="method === 'register'" v-model="auth.role" label="Apply as a publisher"></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" :loading="loading" text @click="submit(method)">{{ method }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Auth',
  props: {
    method: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    dialog: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    auth: {
      name: 'Test',
      email: 'test@test.com',
      password: 'secret',
      role: false
    },
    loading: false
  }),
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
              color: 'red',
              text: err.response.data.message
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
              color: 'red',
              text: err.response.data.message
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
