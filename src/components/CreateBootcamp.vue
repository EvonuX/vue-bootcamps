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
            <v-text-field
              height="42"
              v-model="bootcamp.address"
              label="Address"
              type="text"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-select
              v-model="bootcamp.careers"
              :items="careers"
              multiple
              chips
              required
              label="Careers"
            />
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-checkbox class="mr-10" color="primary" v-model="bootcamp.housing" label="Housing" />
              <v-checkbox
                class="mr-10"
                color="primary"
                v-model="bootcamp.jobAssistance"
                label="Job assistance"
              />
              <v-checkbox
                class="mr-10"
                color="primary"
                v-model="bootcamp.jobGuarantee"
                label="Job guarantee"
              />
              <v-checkbox
                class="mr-10"
                color="primary"
                v-model="bootcamp.acceptGi"
                label="GI acceptance"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <small>All fields are requried</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" :loading="loading" text @click="create">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CreateBootcamp',
  data: () => ({
    bootcamp: {
      name: 'ModernTech Bootcamp',
      description:
        'ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX',
      website: 'https://moderntech.com',
      phone: '(222) 222-2222',
      email: 'enroll@moderntech.com',
      address: '220 Pawtucket St, Lowell, MA 01854',
      careers: ['Web Development', 'UI/UX', 'Mobile Development'],
      housing: false,
      jobAssistance: true,
      jobGuarantee: false,
      acceptGi: true
    },
    careers: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ],
    loading: false
  }),
  methods: {
    closeDialog() {
      this.$emit('closeDialog', false)
    },
    create() {
      this.loading = true
      this.$axios
        .post('/bootcamps', this.bootcamp, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token')
          }
        })
        .then(res => {
          console.log(res)
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    }
  }
}
</script>
