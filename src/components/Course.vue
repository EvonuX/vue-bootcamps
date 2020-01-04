<template>
  <v-card elevation="4" max-width="350" class="ma-5 ml-0" v-if="course.title">
    <v-card-title class="headline">{{ course.title }}</v-card-title>
    <v-card-text v-if="!admin || !course.bootcamp.name">By {{ course.bootcamp.name }}</v-card-text>
    <v-spacer v-if="!admin" />
    <v-card-subtitle style="min-width: 85px;">{{ course.description }}</v-card-subtitle>
    <v-card-actions>
      <v-btn text @click="viewCourse(course._id)">View details</v-btn>
      <v-btn v-if="admin" text @click="updateCourse(course)">Edit course</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Course',
  props: ['course', 'admin'],
  methods: {
    viewCourse(id) {
      this.$router.push(`/course/${id}`)
    },
    updateCourse(course) {
      this.$emit('updateCourse', course)
    }
  }
}
</script>