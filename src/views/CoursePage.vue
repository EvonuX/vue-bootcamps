<template>
  <v-container>
    <v-layout wrap v-if="course.title" class="mt-3">
      <v-flex md6>
        <h2>About the course:</h2>
        <hr class="my-2" />
        <v-list>
          <v-list-item>Name: {{ course.title }}</v-list-item>
          <v-list-item>Description: {{ course.description }}</v-list-item>
          <v-list-item>Length: {{ course.weeks }} weeks</v-list-item>
          <v-list-item>Tuition: {{ course.tuition | money }}</v-list-item>
          <v-list-item class="text-capitalize">Dificulty: {{ course.minimumSkill }}</v-list-item>
          <v-list-item>Scholarship: {{ course.scholarshipAvailable ? "Available" : "Not available" }}</v-list-item>
        </v-list>
        <v-btn color="primary">Enroll today!</v-btn>
      </v-flex>
      <v-flex md6>
        <h2>About the bootcamp:</h2>
        <hr class="my-2" />
        <v-list>
          <v-list-item>Name: {{ course.bootcamp.name }}</v-list-item>
          <v-list-item>Description: {{ course.bootcamp.description }}</v-list-item>
        </v-list>
        <v-btn class="mt-3" color="info" @click="viewBootcamp(course.bootcamp._id)">View Bootcamp</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Course',
  data: () => ({
    course: []
  }),
  beforeCreate() {
    this.$axios.get(`/courses/${this.$route.params.id}`).then(res => {
      console.log(res)
      this.course = res.data.data
    })
  },
  methods: {
    viewBootcamp(id) {
      this.$router.push(`/bootcamp/${id}`)
    }
  }
}
</script>