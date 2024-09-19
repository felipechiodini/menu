<template>
  <div class="d-flex border-top px-2">
    <div class="col p-2">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="text-muted">{{ product.description }}</p>
      <price :price="product.price" />
    </div>
    <img class="wioahfgowaf" :src="product.image">
  </div>
</template>

<script>
import Price from './Price.vue'

export default {
  components: {
    Price
  },
  props: {
    product: {
      type: Object
    }
  }
}
</script>

<style scoped>

  .wioahfgowaf {
    border-radius: 5px;
    align-self: center;
    object-fit: cover;
    height: 100px;
    width: 100px;
  }

  .product-title {
    font-size: 1.7rem;
  }

</style>
