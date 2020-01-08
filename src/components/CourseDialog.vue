<template>
  <v-card>
    <v-card-title>
      <span class="headline text-capitalize">{{ method }} course</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="course.title" label="Title" type="text" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="course.description" label="Description" type="text" required></v-textarea>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model.number="course.weeks" label="Weeks" type="number" required></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model.number="course.tuition" label="Tuition" type="number" required></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-select v-model="course.minimumSkill" :items="difficulty" required class="text-capitalize" label="Difficulty" />
          </v-col>
          <v-col cols="12">
            <v-checkbox color="primary" v-model="course.scholarhipsAvailable" label="Scholarship" />
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
  name: 'CourseDialog',
  props: ['course', 'method', 'bootcamp'],
  data: () => ({
    difficulty: ['beginner', 'intermediate', 'advanced'],
    loading: false,
    headers: { headers: { Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token') } }
  }),
  methods: {
    closeDialog() {
      this.$emit('closeDialog', false)
    },
    remove() {
      this.loading = true
      this.$axios.delete(`/courses/${this.course._id}`, this.headers).then(() => {
        this.closeDialog()
        this.loading = false
        this.$store.dispatch('setSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Course removed'
        })
      })
    },
    create() {
      if (this.method === 'create') {
        this.loading = true
        this.$axios
          .post(`/bootcamps/${this.bootcamp._id}/courses`, this.course, this.headers)
          .then(res => {
            this.closeDialog()
            this.loading = false
            this.$emit('addCourse', res.data.data)
            this.$store.dispatch('setSnackbar', {
              snackbar: true,
              color: 'success',
              text: 'Course created'
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
      } else {
        this.loading = true
        this.$axios
          .put(`/courses/${this.course._id}`, this.course, this.headers)
          .then(() => {
            this.closeDialog()
            this.loading = false
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
}
</script>
