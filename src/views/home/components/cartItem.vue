<template>
  <div class="cart-item">
    <div class="cart-item__title">{{ itemInGoodsList.name }}</div>
    <PriceFrame
      class="cart-item__price"
      :currencySymbol="'₽'"
      :unitAlias="'шт.'"
      :price="currentPrice"
      :colorize="false"
    />
    <ItemControls
      class="cart-item__controls"
      :total="itemInGoodsList.quantity"
      :availibleAmountToAdd="availibleAmountToAdd"
      :qtyInCart="item.quantity"
      @update="updateValue"
    />
    <div
      :class="['cart-item__delete-btn', { ['disabled']: item.quantity < 2 }]"
      @click="updateValue(0)"
    >
      delete
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { IItem } from 'src/stores/modules/interafaces'
import { useMainStore } from '../../../stores/main'
import ItemControls from '../components/itemControls.vue'
import PriceFrame from '../components/priceFrame.vue'

// import testF from '../../../composables/test'

export default defineComponent({
  name: 'CartItem',
  components: {
    ItemControls,
    PriceFrame,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props: object) {
    const store = useMainStore()
    const { updateItemInCart } = store
    const { item } = toRefs(props)

    const itemInGoodsList = computed(() => {
      return store.collection[item.value.categoryId].goods[item.value.id]
    })
    const availibleAmountToAdd = computed(() => {
      return itemInGoodsList.value.quantity - item.value.quantity
    })
    const currentPrice = computed(() => {
      return +(itemInGoodsList.value.priceUSD * store.exchangeRate).toFixed(2)
    })

    return { store, updateItemInCart, itemInGoodsList, availibleAmountToAdd, currentPrice }
  },

  methods: {
    updateValue(val: number) {
      const itemUpdated: IItem = { ...this.item, quantity: val }

      this.updateItemInCart(itemUpdated)
    },
  },
})
</script>
<style lang="stylus">
.cart-item {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(2, auto);
  grid-gap: 5px 10px;
  align-items: center;
  justify-items: center;
  user-select: none;

  &__title {
    font-size: 14px;
    color: #dedede;
    font-weight: 400;
    flex-shrink: 0;
    justify-self: start;
    text-align: left;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  &__price {
    font-size: 14px;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    justify-self: start;
  }

  &__controls {
    position: relative;
    flex-shrink: 0;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 100%;
  }

  &__delete-btn {
    padding: 2px 20px;
    border-radius: 6px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.25s ease;
    user-select: none;
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    &:hover {
      color: #ff0000;
    }

    &:active {
      color: orangered;
      letter-spacing: 2px;
    }

    &.disabled {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
