<template>
  <v-container>
    <v-layout wrap>
      <v-row>
        <v-dialog v-if="!bootcamp.courses" v-model="createBootcamp" width="50%">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Create bootcamp</v-btn>
          </template>

          <CreateBootcamp @closeDialog="createBootcamp = false" />
        </v-dialog>

        <v-flex md6>
          <h3>Your bootcamp:</h3>
          <Bootcamp :bootcamp="bootcamp" :admin="true" />
        </v-flex>

        <v-flex md6>
          <h3>Your courses:</h3>
          <v-btn @click="createCourse">Create course</v-btn>
          <Course
            v-for="course in courses"
            :key="course._id"
            :course="course"
            :admin="true"
            @updateCourse="updateCourse"
          />
        </v-flex>
      </v-row>
    </v-layout>

    <v-dialog v-model="courseDialog" width="50%">
      <CourseDialog
        @addCourse="addCourse"
        @closeDialog="courseDialog = false"
        :bootcamp="bootcamp"
        :course="course"
        :method="method"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import CreateBootcamp from '@/components/CreateBootcamp'
import CourseDialog from '@/components/CourseDialog'
import Bootcamp from '@/components/Bootcamp'
import Course from '@/components/Course'

export default {
  name: 'Dashboard',
  components: { CreateBootcamp, CourseDialog, Bootcamp, Course },
  data: () => ({
    createBootcamp: false,
    courseDialog: false,
    uploadDialog: false,
    bootcamp: {},
    courses: [],
    course: {},
    method: 'create'
  }),
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  beforeMount() {
    this.$axios.get('/bootcamps').then(res => {
      res.data.data.map(el => {
        if (el.user === this.user._id) this.bootcamp = el
      })
    })
    this.$axios.get('/courses').then(res => {
      res.data.data.forEach(el => {
        if (el.user === this.user._id) this.courses.push(el)
      })
    })
  },
  methods: {
    createCourse() {
      this.method = 'create'
      this.courseDialog = true
      this.course = {
        title: '',
        description: '',
        weeks: 0,
        tuition: 0,
        minimumSkill: '',
        scholarhipsAvailable: false
      }
    },
    updateCourse(course) {
      this.courseDialog = true
      this.method = 'update'
      this.course = course
    },
    addCourse(course) {
      this.courses.push(course)
    }
  }
}
</script>