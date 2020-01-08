<template>
  <v-container>
    <v-layout wrap v-if="bootcamp.name">
      <v-flex xs12 md12 text-center class="mb-10">
        <h1>{{ bootcamp.name }}</h1>
      </v-flex>

      <v-flex md6 xs12 class="pr-5">
        <h3>Bootcamp description:</h3>
        <hr class="my-2" />
        <div>{{ bootcamp.description }}</div>
        <div class="my-5">
          <h3>{{ bootcamp.name }} teaches students in the following fields:</h3>
          <v-chip-group active-class="deep-purple accent-4 white--text" column>
            <v-chip v-for="(career, i) in bootcamp.careers" :key="i" readonly class="ma-2 ml-0">{{ career }}</v-chip>
          </v-chip-group>
        </div>
        <div class="my-5">
          <h3>Bootcamp info:</h3>
          <hr class="my-2" />
          <p>Average cost: {{ bootcamp.averageCost | money }}</p>
          <p>Job find assistance: {{ bootcamp.jobAssistance ? 'Available' : 'Not available' }}</p>
          <p>Job guarantee: {{ bootcamp.jobGuarantee ? 'Available' : 'Not available' }}</p>
          <p>GI bill acceptance: {{ bootcamp.acceptGi ? 'Accepted' : 'Not accepted' }}</p>
        </div>
        <div class="my-5">
          <h3>Contact info:</h3>
          <hr class="my-2" />
          <p>{{ bootcamp.location.formattedAddress }}</p>
          <p>
            <a :href="'tel:' + bootcamp.phone">{{ bootcamp.phone }}</a>
          </p>
          <p>
            <a :href="'mailto:' + bootcamp.email">{{ bootcamp.email }}</a>
          </p>
          <v-btn :href="bootcamp.website" target="_blank" rel="noopener" ref="noreferrer" color="info">{{ bootcamp.name }} Website</v-btn>
          <a></a>
        </div>
      </v-flex>

      <v-flex md6 xs12 class="pl-5">
        <h2 v-if="courses.length === 0">This bootcamp does not have courses yet.</h2>
        <h2 v-else>Available courses:</h2>
        <v-row align="start" justify="start">
          <Course v-for="course in courses" :key="course._id" :course="course" :admin="false" :showBy="false" />
        </v-row>
      </v-flex>

      <v-flex xs12 class="mt-5">
        <h2>See what the students are saying!</h2>
        <p>{{ reviews.count }} reviews</p>

        <div v-if="user && user.role == 'user'">
          <v-text-field label="Review title" v-model="newReview.title"></v-text-field>
          <v-textarea label="Review text" v-model="newReview.text"></v-textarea>
          <v-rating v-model="newReview.rating" />
          <v-btn @click="addReview" :loading="loading" class="mt-5" color="priamry">Submit</v-btn>
        </div>

        <div v-if="user && user.role == 'publisher'">
          <p>Publishers are not allowed to post reviews.</p>
        </div>

        <div v-if="!user">
          <p>Log in to add a review.</p>
        </div>

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
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  beforeCreate() {
    this.$store.commit('changeLoading', true)
    this.$axios.get(`/bootcamps/${this.$route.params.id}`).then(res => ((this.bootcamp = res.data.data), this.$store.commit('changeLoading', false)))
    this.$axios.get(`/bootcamps/${this.$route.params.id}/courses`).then(res => (this.courses = res.data.data))
    this.$axios.get(`/bootcamps/${this.$route.params.id}/reviews`).then(res => (this.reviews = res.data))
  },
  methods: {
    addReview() {
      this.loading = true
      this.$axios
        .post(`/bootcamps/${this.$route.params.id}/reviews`, this.newReview, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bootcamp_token')
          }
        })
        .then(res => {
          this.loading = false
          this.reviews.push(res.data.data)
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Review added!'
          })
        })
        .catch(err => {
          console.error(err)
          this.loading = false
          this.$store.dispatch('setSnackbar', {
            snackbar: true,
            color: 'red',
            text: 'A user can add only one review for each bootcamp.'
          })
        })
    }
  }
}
</script>
