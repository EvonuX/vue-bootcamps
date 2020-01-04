<template>
  <v-container>
    <v-layout wrap>
      <v-row align="start" justify="start">
        <Course v-for="course in courses" :key="course._id" :course="course" />
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '@/components/Course'

export default {
  name: 'Courses',
  components: { Course },
  data: () => ({
    courses: []
  }),
  beforeCreate() {
    this.$axios.get('/courses').then(res => (this.courses = res.data.data))
  }
}
</script>