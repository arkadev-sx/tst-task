<template>
  <div class="price-frame" :style="`color: ${priceColor}`">
    {{ price }}{{ currencySymbol }}/{{ unitAlias }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PriceFrame',
  props: {
    price: {
      type: Number,
      default: 0,
    },
    currencySymbol: {
      type: String,
      default: '₽',
    },
    unitAlias: {
      type: String,
      default: 'шт.',
    },
    colorize: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      priceColor: 'quo',

      colors: {
        increase: '#9f0000',
        reduction: '#018200',
        quo: '#333',
      },
    }
  },

  watch: {
    price(nv, ov) {
      if (this.colorize) {
        if (nv > ov) this.priceColor = this.colors.increase
        else if (nv < ov) this.priceColor = this.colors.reduction
        else this.priceColor = this.colors.quo
      }
    },
  },
  methods: {},
})
</script>
