<template>
  <v-container>
    <v-layout wrap>
      <v-flex v-for="bootcamp in bootcamps" :key="bootcamp._id" md3 xs12>
        <Bootcamp :bootcamp="bootcamp" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Bootcamp from '@/components/Bootcamp'

export default {
  name: 'Bootcamps',
  components: { Bootcamp },
  data: () => ({
    bootcamps: []
  }),
  beforeCreate() {
    this.$store.commit('changeLoading', true)
    this.$axios.get('/bootcamps').then(res => {
      this.$store.commit('changeLoading', false)
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
