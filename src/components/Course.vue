<template>
  <v-card :color="color" dark elevation="7" max-width="350" class="ma-3">
    <v-card-title class="headline">{{ course.title }}</v-card-title>
    <v-card-text>By {{ course.bootcamp.name }}</v-card-text>
    <v-card-subtitle style="min-width: 85px;">{{ course.description }}</v-card-subtitle>
    <v-card-actions>
      <v-btn text @click="viewCourse(course._id)">View details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Course',
  props: ['course'],
  computed: {
    color() {
      const letters = '0123456789'.split('')
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 10)]
      }
      return color
    }
  },
  methods: {
    viewCourse(id) {
      this.$router.push(`/course/${id}`)
    }
  }
}
</script>