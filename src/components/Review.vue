<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row justify="space-between" align="center" class="mb-5">
          <h3>{{ review.title }}</h3>
          <v-rating readonly v-model="review.rating" />
        </v-row>
        <p>{{ review.text }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Review',
  props: ['review']
}
</script>