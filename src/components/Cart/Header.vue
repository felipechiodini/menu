<template>
  <div class="d-flex justify-content-center align-items-center w-100 bg-primary p-3">
    <span @click="$emit('go-back')" class="material-icons text-white" :class="{ 'down': down }">{{ icon }}</span>
    <h3 class="col text-white">{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: ['icon', 'name', 'down']
}
</script>

<style lang="scss" scoped>

  .down {
    transform: rotate(90deg);
  }

</style>