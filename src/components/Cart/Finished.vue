<template>
  <div>
    <cart-header @click="$emit('close')" icon="arrow_forward_ios" name="" :down="true" />
    <div class="d-flex flex-column align-items-center my-4">
      <span style="font-size: 6rem;" class="material-icons text-primary mb-4">check_circle_outline</span>
      <h3 style="font-size: 1.5rem;">Pedido Confirmado</h3>
    </div>
  </div>
</template>

<script>
import CartHeader from './Header.vue'

export default {
  components: {
    CartHeader
  }
}
</script>

<style>

</style>