<template>
  <modal v-model="opened">
    <transition name="slide" mode="out-in">
    <template v-if="step === 'first-step'">
      <step-one @go-back="closeModal()" @next-step="setStep('second-step')" />
    </template>
    <template v-else-if="step === 'second-step'">
      <step-two @go-back="setStep('first-step')" @open-address="setStep('address')" @next-step="setStep('thrid-step')" />
    </template>
    <template v-else-if="step === 'thrid-step'">
      <step-three @go-back="setStep('second-step')" @finished="setStep('finished')" />
    </template>
    <template v-else-if="step === 'address'">
      <addresss @go-back="setStep('second-step')"  />
    </template>
    <template v-else-if="step === 'finished'">
      <finished  />
    </template>
  </transition>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import StepOne from '@/components/Cart/StepOne.vue'
import StepTwo from '@/components/Cart/StepTwo.vue'
import StepThree from '@/components/Cart/StepThree.vue'
import Addresss from '@/components/Cart/Address.vue'
import Finished from '@/components/Cart/Finished.vue'
import FloatButton from '@/components/FloatButton.vue';
import { mapGetters } from 'pinia';

export default {
  name: 'Cart',
  components: {
    Modal,
    StepOne,
    StepTwo,
    StepThree,
    FloatButton,
    Addresss,
    Finished
  },
  data: () => {
    return {
      step: 'first-step',
      opened: false,
    }
  },
  watch: {
    'hasProducts': function(value) {
      if (value === false) this.closeModal()
    }
  },
  computed: {
    ...mapGetters('cart', ['numberProducts', 'hasProducts', 'cartTotalPrice'])
  },
  mounted() {
    this.$root.$on('child2', () => console.log('uidwahufa'));
  },
  methods: {
    setStep(name) {
      this.step = name
    },
    openModal() {
      this.opened = true
    },
    closeModal() {
      this.opened = false
    },
    goBack() {
      this.step--
    }
  }
}
</script>

<style lang="scss" scoped>

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

</style>