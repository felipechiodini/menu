<template>
  <div class="d-flex">
    <h5 v-if="price.from" class="me-2">
      {{ currency(price.from) }}
    </h5>
    <h5 :class="{ 'price-from': price.from !== null }">
      {{ currency(price.to) }}
    </h5>
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
    margin-left: 10px;
  }
</style>