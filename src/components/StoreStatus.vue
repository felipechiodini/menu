<template>
  <div class="d-flex align-items-center">
    <span class="ml-2">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    label() {
      return this.status ? 'Aberto' : 'Fechado'
    }
  }
}
</script>
