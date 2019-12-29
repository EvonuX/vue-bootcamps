<template>
  <v-container>
    <v-layout wrap v-if="user.data.name">
      <v-flex xs12 md12 class="mb-10">
        <v-dialog v-model="bootcamp" width="80%">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Create bootcamp</v-btn>
          </template>

          <CreateBootcamp @closeDialog="bootcamp = false" />
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CreateBootcamp from '@/components/CreateBootcamp'

export default {
  name: 'Dashboard',
  components: { CreateBootcamp },
  data: () => ({
    bootcamp: false
  }),
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  }
}
</script>