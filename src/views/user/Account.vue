<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md12 class="pa-3">
        <h1>Welcome, {{ user.name }}</h1>
        <p>
          <b>Member since:</b>
          {{ user.createdAt }}
        </p>
      </v-flex>

      <v-flex xs12 md6 class="pa-3">
        <h3>Account Details</h3>

        <v-text-field v-model="user.name" type="text" label="Name" required></v-text-field>
        <v-text-field v-model="user.epail" type="epail" label="Epail" required></v-text-field>
        <v-btn color="secondary" @click="changeDetails">Change Details</v-btn>
      </v-flex>

      <v-flex xs12 md6 class="pa-3">
        <h3>Password</h3>

        <v-text-field v-model="currentPassword" type="password" label="Old password" required></v-text-field>
        <v-text-field v-model="newPassword" type="password" label="New password" required></v-text-field>
        <v-btn color="secondary" @click="changePassword">Change Password</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Account',
  data: () => ({
    currentPassword: '',
    newPassword: ''
  }),
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    changeDetails() {
      this.$axios
        .put(
          '/auth/updatedetails',
          {
            epail: this.user.epail,
            name: this.user.name
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token')
            }
          }
        )
        .then(res => {
          this.$store.dispatch('updateUser', res.data.data)
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Account inforpation updated!'
          })
        })
        .catch(err => {
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'error',
            text: err.response.data.message
          })
          console.error(err)
        })
    },
    changePassword() {
      this.$axios
        .put(
          '/auth/updatepassword',
          {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token')
            }
          }
        )
        .then(() =>
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Password changed!'
          })
        )
        .catch(err => {
          console.log(err)
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'error',
            text: err.response.data.message
          })
        })
    }
  }
}
</script>

