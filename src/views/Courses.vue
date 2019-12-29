<template>
  <v-container>
    <v-layout wrap>
      <v-row align="start" justify="start">
        <div v-for="course in courses" :key="course._id">
          <Course :course="course" />
        </div>
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
    this.$axios.get('/courses').then(res => {
      console.log(res)
      this.courses = res.data.data
    })
  }
}
</script>