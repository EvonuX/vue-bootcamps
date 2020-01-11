<template>
  <v-card elevation="4" class="ma-5" v-if="course.title">
    <v-card-title class="headline">{{ course.title }}</v-card-title>
    <v-card-text v-if="showBy">By {{ course.bootcamp.name }}</v-card-text>
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
  props: {
    course: {
      type: Object,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    showBy: {
      type: Boolean,
      default: true
    }
  },
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
