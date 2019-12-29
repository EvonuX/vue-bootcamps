<template>
  <div>
    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

    <v-card-title>{{ bootcamp.name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <v-row justify="space-between" align="center" class="my-4 mx-auto subtitle-1 black--text">
        <span>Average cost: {{ bootcamp.averageCost | money }}</span>
        <span class="light-text">{{ bootcamp.courses.length }} courses</span>
      </v-row>

      <div style="min-height: 90px;">{{ bootcamp.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple accent-4" text @click="viewBootcamp(bootcamp._id)">View details</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'Bootcamp',
  props: ['bootcamp'],
  methods: {
    viewBootcamp(id) {
      this.$router.push(`/bootcamp/${id}`)
    }
  }
}
</script>