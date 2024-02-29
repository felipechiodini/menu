<template>
  <div class="d-flex justify-content-center align-items-center w-100 bg-primary p-2">
    <button @click="$emit('go-back')" class="pi pi-chevron-left text-white">
      <i class=""></i>  
    </button>
    <span class="col text-white">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

 button {
  border: none;
  background-color: transparent;
  padding: .4rem;
 }

</style>