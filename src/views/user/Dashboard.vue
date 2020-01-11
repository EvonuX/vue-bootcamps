<template>
  <v-container>
    <v-layout wrap>
      <v-row>
        <v-flex md6>
          <div v-if="!bootcamp.name">
            <h3>You currently don't have a bootcamp added, click on the button below to to begin.</h3>
            <v-btn class="mt-5" @click="createBootcamp">Create bootcamp</v-btn>
            <v-img src="@/assets/process.svg" width="50%" />
          </div>
          <div v-else>
            <h3>Your bootcamp:</h3>
            <Bootcamp :bootcamp="bootcamp" :admin="true" @updateBootcamp="updateBootcamp" />
          </div>
        </v-flex>

        <v-flex md6>
          <h3>Your courses:</h3>
          <div v-if="courses.length === 0">
            Your bootcamp does not have courses added, click on the button below to begin.
          </div>
          <v-btn class="mt-5" @click="createCourse">Create course</v-btn>
          <Course v-for="course in courses" :key="course._id" :course="course" :admin="true" :showBy="false" @updateCourse="updateCourse" />
        </v-flex>
      </v-row>
    </v-layout>

    <v-dialog v-model="courseDialog" width="50%">
      <CourseDialog @addCourse="addCourse" @closeDialog="courseDialog = false" :bootcamp="bootcamp" :course="course" :method="method" />
    </v-dialog>

    <v-dialog v-model="bootcampDialog" width="50%">
      <BootcampDialog :bootcamp="bootcamp" :method="method" @closeDialog="bootcampDialog = false" @deleteBootcamp="bootcamp = {}" />
    </v-dialog>
  </v-container>
</template>

<script>
import BootcampDialog from '@/components/BootcampDialog'
import CourseDialog from '@/components/CourseDialog'
import Bootcamp from '@/components/Bootcamp'
import Course from '@/components/Course'

export default {
  name: 'Dashboard',
  components: { BootcampDialog, CourseDialog, Bootcamp, Course },
  data: () => ({
    bootcampDialog: false,
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
    this.$store.commit('changeLoading', true)
    this.$axios.get('/bootcamps').then(res => {
      res.data.data.map(el => {
        if (el.user === this.user._id) this.bootcamp = el
      })
      this.$store.commit('changeLoading', false)
    })
    this.$axios.get('/courses').then(res => {
      res.data.data.forEach(el => {
        if (el.user === this.user._id) this.courses.push(el)
      })
      this.$store.commit('changeLoading', false)
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
    },
    createBootcamp() {
      this.method = 'create'
      this.bootcampDialog = true
      this.bootcamp = {
        name: '',
        description: '',
        website: '',
        phone: '',
        email: '',
        address: '',
        housing: false,
        jobAssistance: false,
        jobGuarantee: false,
        acceptGi: false
      }
    },
    updateBootcamp() {
      this.method = 'update'
      this.bootcampDialog = true
    }
  }
}
</script>
