<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
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
  props: ['method', 'title', 'dialog'],
  data: () => ({
    auth: {
      name: 'Test',
      email: 'test@test.com',
      password: 'secret',
      role: 'user'
    },
    loading: false
  }),
  methods: {
    submit(method) {
      if (method === 'register') {
        this.loading = true
        this.$axios
          .post('/auth/register', this.auth)
          .then(res => {
            this.$store.dispatch('storeUser', res.data)
            localStorage.setItem('bootcamp_token', res.data.token)
            this.closeDialog()
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      } else {
        this.loading = true
        this.$axios
          .post('/auth/login', this.auth)
          .then(res => {
            this.closeDialog()
            localStorage.removeItem('bootcamp_token')
            localStorage.removeItem('vuex')
            this.$store.dispatch('storeUser', res.data.data)
            localStorage.setItem('bootcamp_token', res.data.token)
          })
          .catch(err => {
            console.error(err)
            this.loading = false
          })
      }
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
