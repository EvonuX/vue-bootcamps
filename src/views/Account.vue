<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md12 text-center class="my-5">
        <h1>Welcome, {{ user.name }}</h1>
        <p>
          <b>Created at:</b>
          {{ user.createdAt }}
        </p>
      </v-flex>

      <v-flex xs12 md6 class="pa-5">
        <h1>Account Details</h1>

        <v-text-field v-model="user.name" type="text" label="Name" required></v-text-field>
        <v-text-field v-model="user.email" type="email" label="Email" required></v-text-field>
        <v-btn @click="changeDetails">Change Details</v-btn>
      </v-flex>

      <v-flex xs12 md6 class="pa-5">
        <h1>Password</h1>

        <v-text-field v-model="currentPassword" type="password" label="Old password" required></v-text-field>
        <v-text-field v-model="newPassword" type="password" label="New password" required></v-text-field>
        <v-btn @click="changePassword">Change Password</v-btn>
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
            email: this.user.email,
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
        })
        .catch(err => console.error(err))
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
        .then(res => console.log(res))
    }
  }
}
</script>
