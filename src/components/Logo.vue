<template>
  <img :src="store.logo" alt="">
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store';

export default {
  computed: {
    ...mapState(useStore, ['store']),
  }
}

</script>

<style scoped>

img {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
}

</style>