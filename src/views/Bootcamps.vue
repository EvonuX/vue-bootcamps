<template>
  <v-container>
    <v-layout wrap>
      <v-row align="start" justify="start">
        <div v-for="bootcamp in bootcamps" :key="bootcamp._id">
          <Bootcamp :bootcamp="bootcamp" />
        </div>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import Bootcamp from '@/components/Bootcamp'

export default {
  name: 'Bootcamps',
  components: { Bootcamp },
  data: () => ({
    bootcamps: [],
    loading: false
  }),
  beforeCreate() {
    this.loading = true
    this.$axios.get('/bootcamps').then(res => {
      this.loading = false
      this.bootcamps = res.data.data
    })
  },
  methods: {
    viewBootcamp(id) {
      this.$router.push(`/bootcamp/${id}`)
    }
  }
}
</script>