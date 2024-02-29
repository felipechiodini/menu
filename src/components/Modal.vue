<template>
  <div class="fullscreen-modal" id="modal" :class="{ 'opened': modelValue === true, 'closed': modelValue === false }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'modelValue': function(newValue) {
      document.body.style.overflow = (newValue === true) ? 'hidden' : ''
    }
  }
}
</script>

<style lang="scss" scoped>

  .fullscreen-modal {
    display: none;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow: auto;
  }

  .opened {
    display: flex;
    animation: slide-up 0.3s ease-out forwards;
  }

  .closed {
    animation: slide-down 0.3s ease-out forwards;
  }

  @keyframes slide-down {
    0% {
      transform: translateY(0%);
    }

    100% {
      transform: translateY(100%);
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }

    100% {
      transform: translateY(0%);
    }
  }

</style>