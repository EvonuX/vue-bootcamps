<template>
  <v-container>
    <v-layout wrap v-if="bootcamp.name">
      <v-flex xs12 md12 text-center class="mb-10">
        <h1>{{ bootcamp.name }}</h1>
      </v-flex>
      <v-flex md6>
        <img :src="bootcamp.photo" :alt="bootcamp.name" />
      </v-flex>
      <v-flex md6>
        <h3>Bootcamp description:</h3>
        <hr class="my-2" />
        <div>{{ bootcamp.description }}</div>
        <div class="my-5">
          <h3>{{ bootcamp.name }} teaches students in the following fields:</h3>
          <v-chip-group active-class="deep-purple accent-4 white--text" column>
            <v-chip v-for="(career, i) in bootcamp.careers" :key="i" class="ma-2 ml-0">{{ career }}</v-chip>
          </v-chip-group>
        </div>
        <div class="my-5">
          <h3>Bootcamp info:</h3>
          <hr class="my-2" />
          <v-list>
            <v-list-item>Average cost: {{ bootcamp.averageCost | money }}</v-list-item>
            <v-list-item>Job find assistance: {{ bootcamp.jobAssistance ? 'Available' : 'Not available' }}</v-list-item>
            <v-list-item>Job guarantee: {{ bootcamp.jobGuarantee ? 'Available' : 'Not available' }}</v-list-item>
            <v-list-item>GI bill acceptance: {{ bootcamp.acceptGi ? 'Accepted' : 'Not accepted' }}</v-list-item>
          </v-list>
        </div>
        <div class="my-5">
          <h3>Contact info:</h3>
          <hr class="my-2" />
          <v-list>
            <v-list-item>{{ bootcamp.location.formattedAddress }}</v-list-item>
            <v-list-item>
              <a :href="'tel:' + bootcamp.phone">{{ bootcamp.phone }}</a>
            </v-list-item>
            <v-list-item>
              <a :href="'mailto:' + bootcamp.email">{{ bootcamp.email }}</a>
            </v-list-item>
          </v-list>
          <v-btn
            :href="bootcamp.website"
            target="_blank"
            rel="noopener"
            ref="noreferrer"
            color="info"
          >{{ bootcamp.name }} Website</v-btn>
          <a></a>
        </div>
      </v-flex>
      <v-flex xs12 md12 class="my-10">
        <h2>Available courses:</h2>
        <v-row align="start" justify="start">
          <div v-for="course in courses" :key="course._id">
            <Course :course="course" />
          </div>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '@/components/Course'

export default {
  name: 'Bootcamp',
  components: { Course },
  data: () => ({
    bootcamp: [],
    courses: [],
    loading: false
  }),
  beforeCreate() {
    this.$axios.get(`/bootcamps/${this.$route.params.id}`).then(res => {
      console.log('bootcamp', res)
      this.bootcamp = res.data.data
    })
    this.$axios.get(`/bootcamps/${this.$route.params.id}/courses`).then(res => {
      console.log('courses', res)
      this.courses = res.data.data
    })
  }
}
</script>