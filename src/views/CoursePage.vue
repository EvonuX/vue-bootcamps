<template>
  <v-container>
    <v-layout wrap v-if="course.title" class="mt-3">
      <v-flex md6 class="pr-lg-5 pr-sm-none">
        <h2>About the course:</h2>
        <hr class="my-2" />
        <p>Name: {{ course.title }}</p>
        <p>Description: {{ course.description }}</p>
        <p>Length: {{ course.weeks }} weeks</p>
        <p>Tuition: {{ course.tuition | money }}</p>
        <p class="text-capitalize">Dificulty: {{ course.minimumSkill }}</p>
        <p>Scholarship: {{ course.scholarshipAvailable ? "Available" : "Not available" }}</p>
        <v-btn color="primary">Enroll today!</v-btn>
      </v-flex>
      <v-flex md6>
        <h2>About the bootcamp:</h2>
        <hr class="my-2" />
        <p>Name: {{ course.bootcamp.name }}</p>
        <p>Description: {{ course.bootcamp.description }}</p>
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