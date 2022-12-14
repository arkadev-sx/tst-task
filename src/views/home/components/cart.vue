<template>
  <div class="cart">
    <div :class="['summary']">
      <span :class="['summary__notice', { ['visible']: store.cart.length === 0 }]"
        >cart is empty</span
      >
      <div :class="['summary__inner', { ['visible']: store.cart.length > 0 }]">
        Total price: {{ summary }}₽
      </div>
    </div>
    <transition-group tag="div" name="list" class="cart__list">
      <CartItem v-for="item in store.cart" :key="item.id" :item="item" class="list-item" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CartItem from './cartItem.vue'
import { useMainStore } from '../../../stores/main'
import { IItem } from '@/stores/modules/interafaces'

export default defineComponent({
  name: 'CartMain',
  components: {
    CartItem,
  },
  setup() {
    const store = useMainStore()

    const summary = computed(() => {
      let sum = 0
      store.cart.forEach((el: IItem) => {
        const priceForUnitUSD = store.collection[el.categoryId].goods[el.id].priceUSD
        const priceForUnit = priceForUnitUSD * el.quantity
        sum += priceForUnit
      })
      return (sum * store.exchangeRate)
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    })
    return { store, summary }
  },
})
</script>

<style lang="stylus">
@import '../../../assets/styles/constants.styl';

.cart {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: relative;
  }
}

.summary {
  width: 100%;
  position: relative;

  &__inner {
    width: 100%;
    padding: 20px;
    background-color: $substrate-bg-color;
    border-radius: 13px;
    color: black;
    position: relative;
    z-index: 2;
    opacity: 0;
    transition: all 0.3s ease;
    user-select: none;
    transform: translateY(-15px);

    &.visible {
      opacity: 1;
      transition-property: opacity, transform;
      transition-delay: 0.2s;
      transform: translateY(0);
    }
  }

  &__notice {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 10px));
    font-size: 20px;
    font-weight: 500;
    opacity: 0;
    transition: all 0.3s ease;
    user-select: none;
    z-index: 0;

    &.visible {
      opacity: 1;
      transition-property: opacity;
      transition-delay: 0.2s;
    }
  }
}

.list {
  &-enter-active, &-leave-active, &-move {
    transition: all 0.25s;
  }

  &-move {
    transition: all 11s;
  }

  &-item {
    transition: all 0.25s;
  }

  &-enter {
    &-active {
      opacity: 0;
      transform: translateY(-5px);
    }

    &-to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  &-leave {
    &-active {
      opacity: 1;
      position: absolute;
      left: 0;
      width: 100%;
      transition: opacity 0.1s, transform 0.25s;
    }

    &-to {
      opacity: 0;
      transform: translateY(5px);
    }
  }
}
</style>
