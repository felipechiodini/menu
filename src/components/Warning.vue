<template>
  <p class="rounded shadow p-2 border">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>
