<template>
  <div class="d-flex align-items-center">
    <span class="pi pi-circle-fill" :class="color"></span>
    <span class="ms-2">{{ label }}</span>
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
      const labels = {
        true: 'Aberto',
        false: 'Fechado',
      }

      return labels[this.status]
    },
    color() {
      const colors = {
        true: 'text-success',
        false: 'text-danger',
      }

      return colors[this.status]
    }
  }
}
</script>
