<template>
  <v-card>
    <v-card-title>
      <span class="headline">Create bootcamp</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="bootcamp.name" label="Name" type="text" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="bootcamp.description" label="Description" type="text" required></v-textarea>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="bootcamp.website" label="Website URL" type="text" required></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="bootcamp.phone" label="Phone" type="tel" required></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="bootcamp.email" label="Email" type="email" required></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field height="42" v-model="bootcamp.address" label="Address" type="text" required></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-select v-model="bootcamp.careers" :items="careers" multiple chips required label="Careers" />
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-checkbox class="mr-10" color="primary" v-model="bootcamp.housing" label="Housing" />
              <v-checkbox class="mr-10" color="primary" v-model="bootcamp.jobAssistance" label="Job assistance" />
              <v-checkbox class="mr-10" color="primary" v-model="bootcamp.jobGuarantee" label="Job guarantee" />
              <v-checkbox class="mr-10" color="primary" v-model="bootcamp.acceptGi" label="GI acceptance" />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <small>All fields are requried</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="method === 'update'" color="red" :loading="loading" text @click="remove">Remove</v-btn>
      <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" :loading="loading" text @click="create(method)">{{ method }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'BootcampDialog',
  data: () => ({
    careers: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
    loading: false,
    headers: { headers: { Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token') } }
  }),
  props: {
    bootcamp: {
      type: Object
    },
    method: {
      type: String
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog', false)
    },
    create(method) {
      if (method === 'create') {
        this.loading = true
        this.$axios
          .post('/bootcamps', this.bootcamp, this.headers)
          .then(res => {
            this.bootcamp = res.data.data
            this.closeDialog()
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'success',
              text: 'Bootcamp created'
            })
            this.loading = false
          })
          .catch(err => {
            console.error(err)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'red',
              text: err.response.data.error
            })
            this.loading = false
          })
      } else {
        this.loading = true
        this.$axios
          .put(
            `/bootcamps/${this.bootcamp._id}`,
            {
              acceptGi: this.bootcamp.acceptGi,
              address: this.bootcamp.address,
              careers: this.bootcamp.careers,
              description: this.bootcamp.description,
              email: this.bootcamp.email,
              housing: this.bootcamp.housing,
              jobAssistance: this.bootcamp.jobAssistance,
              jobGuarantee: this.bootcamp.jobGuarantee,
              name: this.bootcamp.name,
              phone: this.bootcamp.phone,
              website: this.bootcamp.website
            },
            this.headers
          )
          .then(() => {
            this.closeDialog()
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'success',
              text: 'Bootcamp updated'
            })
            this.loading = false
          })
          .catch(err => {
            console.error(err)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'red',
              text: err.response.data.error
            })
            this.loading = false
          })
      }
    },
    remove() {
      this.loading = true
      this.$emit('deleteBootcamp')
      this.$axios
        .delete(`/bootcamps/${this.bootcamp._id}`, this.headers)
        .then(() => {
          this.bootcamp = {}
          this.loading = false
          this.closeDialog()
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Bootcamp removed'
          })
        })
        .catch(err => {
          console.error(err)
          this.loading = false
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'red',
            text: err.response.data.error
          })
        })
    }
  }
}
</script>
