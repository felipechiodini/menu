<template>
  <div class="d-block mx-auto my-3" v-if="text">
    <strong>
      <p class="bg-warning p-2 rounded mx-2">{{ text }}</p>
    </strong>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  },
  computed: {
    label() {
      return this.status ? 'Aberto' : 'Fechada'
    }
  }
}
</script>

<style>

</style>