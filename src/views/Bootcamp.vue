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
        <div class="courses"></div>
        <h2>Available courses:</h2>
        <v-row align="start" justify="start">
          <div v-for="course in courses" :key="course._id">
            <Course :course="course" />
          </div>
        </v-row>
        <h2>See what the students are saying!</h2>
        <p>{{ reviews.count }} reviews</p>

        <v-text-field label="Review title" v-model="newReview.title"></v-text-field>
        <v-text-field label="Review text" v-model="newReview.text"></v-text-field>
        <v-rating v-model="newReview.rating" />
        <v-btn @click="addReview" class="mt-5" color="priamry">Submit</v-btn>

        <v-list>
          <v-list-item v-for="review in reviews.data" :key="review._id">
            <Review :review="review" />
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '@/components/Course'
import Review from '@/components/Review'

export default {
  name: 'Bootcamp',
  components: { Course, Review },
  data: () => ({
    bootcamp: [],
    courses: [],
    reviews: [],
    loading: false,
    newReview: {
      title: '',
      text: '',
      rating: 0
    }
  }),
  beforeCreate() {
    this.$axios
      .get(`/bootcamps/${this.$route.params.id}`)
      .then(res => (this.bootcamp = res.data.data))
    this.$axios
      .get(`/bootcamps/${this.$route.params.id}/courses`)
      .then(res => (this.courses = res.data.data))
    this.$axios.get(`/bootcamps/${this.$route.params.id}/reviews`).then(res => {
      console.log(res)
      this.reviews = res.data
    })
  },
  methods: {
    addReview() {
      this.$axios
        .post(`/bootcamps/${this.$route.params.id}/reviews`, this.newReview, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token')
          }
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>