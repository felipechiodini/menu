<template>
  <div>
    <cart-header @click="$emit('close')" icon="arrow_forward_ios" name="" :down="true" />
    <div class="d-flex flex-column align-items-center my-4">
      <h3 style="font-size: 1.5rem;">Pedido Confirmado</h3>
    </div>
  </div>
</template>

<script>
import CartHeader from './Header.vue'

export default {
  name: 'finished',
  components: {
    CartHeader
  }
}
</script>

<style>

</style>