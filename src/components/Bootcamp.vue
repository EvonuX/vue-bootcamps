<template>
  <v-card elevation="4" class="ma-5" max-width="350" v-if="bootcamp.name">
    <v-card-title>{{ bootcamp.name }}</v-card-title>

    <v-card-text>
      <v-row
        v-if="bootcamp.courses.length > 0"
        justify="space-between"
        align="center"
        class="my-4 mx-auto subtitle-1 black--text"
      >
        <span>Average cost: {{ bootcamp.averageCost | money }}</span>
        <span class="light-text">{{ bootcamp.courses.length }} courses</span>
      </v-row>

      <v-row v-else class="my-4 mx-auto subtitle-1 black--text">
        <span>This bootcamp does not have courses yet</span>
      </v-row>

      <div style="min-height: 90px;">{{ bootcamp.description }}</div>
    </v-card-text>

    <v-divider class="mx-4" />

    <v-card-actions>
      <v-btn color="secondary" text @click="viewBootcamp(bootcamp._id)">View details</v-btn>
      <v-btn v-if="admin" color="secondary" text @click="$emit('updateBootcamp')">Edit bootcamp</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Bootcamp',
  props: {
    bootcamp: {
      type: Object,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    viewBootcamp(id) {
      this.$router.push(`/bootcamp/${id}`)
    }
  }
}
</script>
