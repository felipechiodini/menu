<template>
  <div class="text-white bg-danger rounded p-1 mx-1">
    <span class="text-nowrap">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style>

</style>