<template>
  <button>
    +
  </button>
</template>

<script>

export default {
  name: 'CartButton'
}
</script>

<style scoped>

  button {
    position: fixed;
    border-radius: 50px;
    border: none;
    height: 50px;
    width: 50px;
    bottom: 20px;
    right: 20px;
    font-size: 2rem;
    color: white;
    z-index: 20;
    background-color: red;
  }

</style>