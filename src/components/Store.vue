<template>
  <div class="d-flex flex-column content-size">
    <div class="flex-grow-1 overflow-auto">
      <Carousel :value="store.banners" :numVisible="1" :circular="true" :showNavigators="false" :showIndicators="false" :autoplayInterval="3000">
        <template #item="slotProps">
          <img width="100%" :src="slotProps.data.src" alt="">
        </template>
      </Carousel>
      <div class="p-3">
        <h3 class="title mb-3">{{ store.name }}</h3>
        <StoreStatus :status="store.open.is_open" />
        <div class="d-flex flex-column">
          <span v-for="(option, key) in store.delivery_options" :key="key">
            {{ option.name }}: {{ time(option.minutes) }}
          </span>
          <span v-if="store.configuration.minimum_order_value">
            {{ 'Pedido minimo: ' + currency(store.configuration.minimum_order_value) }}
          </span>
          <span>
            {{ store.address.street }},
            {{ store.address.number }} -
            {{ store.address.neighborhood }},
            {{ store.address.city }}
          </span>
        </div>
        <!-- <h5>{{ labelDistance }}</h5> -->
        <Warning class="mt-3" v-if="store.configuration.warning" :text="store.configuration.warning" />
      </div>
      <div class="faopwjfowpafhoiwafhiowa">
        <button v-for="(category, key) in store.categories" :key="key" @click="scrollToCategory(category)">
          {{ category.name }}
        </button>
      </div>
      <div>
        <Product
          @click="showProduct(product)"
          v-for="(product, key) in store.products"
          :key="key"
          :product="product"
          :category="product.category_name" />
      </div>
    </div>
    <div class="border-top w-100 p-3 shadow-lg bg-white" v-if="hasProducts" style="height: 11vh;">
      <button class="btn btn-primary w-100 p-2" style="font-size: .8rem;" @click="showCart = true">
        <div class="d-flex justify-content-around">
          <span class="col text-white">{{ numberProducts }}</span>
          <span class="col text-white">Ver Carrinho</span>
          <span class="col text-white">{{ currency(cartTotalProducts) }}</span>
        </div>
      </button>
    </div>
  </div>
  <ProductPreview v-model="selectedProduct" />
  <Cart @open-preview="daowpjfowajfaw" v-model="showCart" @close="showCart = false" />
</template>

<script>
import Carousel from 'primevue/carousel';
import StoreStatus from '@/components/StoreStatus.vue'
import Warning from '@/components/Warning.vue'
import Product from '@/components/Product.vue'
import ProductPreview from '@/components/ProductPreview.vue'
import Modal from './Modal.vue'
import Api from '@/js/Api'
import { mapActions, mapState } from 'pinia'
import { useCartStore } from '@/stores/cart'
import Loading from './Loading.vue'
import Cart from './Cart.vue'
import { useStore } from '@/stores/store';

export default {
  name: 'Home',
  components: {
    StoreStatus,
    Warning,
    Product,
    Carousel,
    Cart,
    Loading,
    // CartButton,
    Modal,
    ProductPreview,
  },
  data: () => {
    return {
      distance: null,
      products: null,
      selectedProduct: null,
      openPreview: false,
      product: null,
      counter: 1,
      loading: false,
      opened: false,
      observation: null,
      additionals: [],
      replacements: [],
      showCart: false
    }
  },
  computed: {
    ...mapState(useStore, ['store']),
    ...mapState(useCartStore, ['hasProducts', 'numberProducts', 'cartTotal', 'hasProducts', 'cartTotalProducts']),
  },
  mounted() {
    this.getDistance()
  },
  methods: {
    ...mapActions(useCartStore, ['addProduct']),
    getDistance() {
      navigator.geolocation.getCurrentPosition((data) => {
        const {
          latitude,
          longitude
        } = data.coords
        Api.get(`${this.$route.params.slug}/distance`, {
            params: {
              latitude,
              longitude
            }
          })
          .then(({
            data
          }) => {
            this.distance = data.distance
          })
      })
    },
    showProduct(product) {
      this.selectedProduct = product
    },
    scrollToCategory(category) {
      const element = document.querySelector('[category="' + category.name + '"]');
      const headerOffset = 45;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    time(time) {
      if (time < 60) {
        return time + " minutos";
      } else {
        let hours = Math.floor(time / 60);
        let minutes = time % 60;
        return hours + "h" + minutes;
      }
    },
    daowpjfowajfaw(id) {
      this.selectedProduct = this.store.products.find(i => i.id === id)
      console.log(this.selectedProduct)
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 1.7rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

  .faopwjfowpafhoiwafhiowa {
    display: flex;
    overflow-x: auto;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;

    &::-webkit-scrollbar {
      display: none;
    }

    & button {
      border: none;
      padding: 10px 0;
      color: #000;
      margin: 0 5px;
      background: transparent;
    }

    & button.active {
      border-bottom: 0.8px solid red;
    }
  }

</style>