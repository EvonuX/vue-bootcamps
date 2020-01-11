<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="course in courses" :key="course._id" md3 xs12>
        <Course :course="course" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '@/components/Course'

export default {
  name: 'Courses',
  components: { Course },
  data: () => ({ courses: [] }),
  beforeCreate() {
    this.$store.commit('changeLoading', true)
    this.$axios
      .get('/courses')
      .then(
        res => (
          (this.courses = res.data.data),
          this.$store.commit('changeLoading', false)
        )
      )
  }
}
</script>
