<template>
  <div class="item">
    <div class="item__title">{{ item.name }}</div>
    <div class="item__quantity">{{ availibleAmountToAdd }}шт.</div>
    <PriceFrame
      class="item__price"
      :currencySymbol="'₽'"
      :unitAlias="'шт.'"
      :price="currentPrice"
      :colorize="true"
    />
    <div
      :class="['item__add-btn', { ['disabled']: availibleAmountToAdd === 0 }]"
      @click="addToCartBtnHandler"
    >
      add to cart
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PriceFrame from '../components/priceFrame.vue'
import { useMainStore } from '../../../stores/main'
import { IItem } from 'src/stores/modules/interafaces'

export default defineComponent({
  name: 'GridItem',
  components: {
    PriceFrame,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    catId: {
      type: String,
      default: '0',
    },
    itemId: {
      type: String,
      default: '0',
    },
  },
  setup() {
    const store = useMainStore()
    const { selectItemInCartById, updateItemInCart } = store
    return { store, updateItemInCart, selectItemInCartById }
  },

  computed: {
    currentPrice() {
      return +(this.item.priceUSD * this.store.exchangeRate).toFixed(2)
    },
    amountInCart() {
      const found = this.selectItemInCartById(this.itemId)

      if (found) {
        return found.quantity
      } else return 0
    },
    availibleAmountToAdd() {
      return this.item.quantity - this.amountInCart
    },
  },

  methods: {
    addToCartBtnHandler() {
      if (this.amountInCart > 0) {
        if (this.availibleAmountToAdd > 0) {
          this.updateValue(this.amountInCart + 1)
        }
      } else if (this.amountInCart === 0) {
        this.updateValue(1)
      }
    },
    updateValue(val: number) {
      const itemCreated: IItem = {
        id: this.itemId,
        categoryId: this.catId,
        quantity: val,
      }
      this.updateItemInCart(itemCreated)
    },
  },
})
</script>
<style lang="stylus">
.item {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr auto;
  align-items: center;
  grid-gap: 10px;

  &__title {
    font-size: 18px;
    color: #444;
    font-weight: 500;
    flex-shrink: 0;
    justify-self: start;
    text-align: left;
  }

  &__price {
    white-space: nowrap;
    font-weight: 500;
  }

  &__add-btn {
    position: relative;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    background-color: #d8d8d8;
    font-weight: 500;
    color: #4c4c4c;
    user-select: none;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;

    &.disabled {
      pointer-events: none;
      background-color: #b4b4b4;
    }

    &:hover {
      opacity: 0.75;
    }

    &:active {
      transform: translateY(1px);
      opacity: 0.9;
    }
  }
}
</style>
