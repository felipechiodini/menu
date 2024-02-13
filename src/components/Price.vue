<template>
<div class="d-flex">
  <h5 v-if="price.current" class="mr-2">{{ (price.current) }}</h5>
  <h5 :class="{ 'price-from': price.current !== null }">{{ (price.previous) }}</h5>
</div>
</template>

<script>
export default {
  name: 'price',
  props: {
    price: {
      type: Object
    }
  }
}
</script>

<style scoped>

  .price-from {
    font-size: 13px;
    text-decoration: line-through;
  }

</style>
