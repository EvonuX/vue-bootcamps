<template>
  <v-card>
    <v-card-title>
      <span class="headline">Create bootcamp</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="course.name" label="Name" type="text" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="course.description" label="Description" type="text" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="course.website" label="Website URL" type="text" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="course.phone" label="Phone" type="tel" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="course.email" label="Email" type="email" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="course.address" label="address" type="text" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="course.careers" label="Careers" type="text" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-checkbox v-model="course.housing" label="Housing"></v-checkbox>
            <v-checkbox v-model="course.jobAssistance" label="Job assistance"></v-checkbox>
            <v-checkbox v-model="course.jobGuarantee" label="Job guarantee"></v-checkbox>
            <v-checkbox v-model="course.acceptGi" label="GI acceptance"></v-checkbox>
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
    course: {
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
    loading: false
  }),
  methods: {
    closeDialog() {
      this.$emit('closeDialog', false)
    },
    create() {
      this.$axios
        .post('/bootcamps', this.course, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token')
          }
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>
