<template>
  <div class="category">
    <div class="category__title" @click="toggle">
      <div :class="['category__switch', { ['folded']: !isOpen, ['empty']: isEmptyBlock }]">
        <div class="icon"></div>
      </div>

      <span :class="['category__title-text', { ['empty']: isEmptyBlock }]"> {{ title }}</span>
    </div>
    <div class="category__box">
      <slide-up-down v-model="isOpen" :duration="220" class="category__fold">
        <div v-if="isEmptyBlock" :class="['category__empty-notice']">
          there is no availible goods for this category
        </div>
        <slot></slot>
      </slide-up-down>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SlideUpDown from 'vue3-slide-up-down'

export default defineComponent({
  name: 'GridCategory',
  components: { SlideUpDown },

  props: {
    title: {
      type: String,
      default: 'Category Title',
    },
    isEmptyBlock: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: true,
    }
  },
  beforeMount() {
    if (this.isEmptyBlock) this.isOpen = false
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
})
</script>
<style lang="stylus">
.category {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    margin-right: auto;
    font-size: 22px;
    font-weight: 600;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    &-text {
      &.empty {
        opacity: 0.5;
      }
    }
  }

  &__switch {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    transition: all 0.25s ease;
    position: relative;
    cursor: pointer;

    &.empty {
      opacity: 0.5;
    }

    .icon {
      width: 16px;
      height: 16px;
      background: url("data:image/svg+xml,%3Csvg width='24' height='14' viewBox='0 0 24 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.7144 13.6644C12.322 14.0633 11.6787 14.0626 11.2871 13.6629L0.685498 2.8404C0.304643 2.45161 0.304644 1.82963 0.685499 1.44084L1.43383 0.676922C1.82665 0.27592 2.47251 0.276737 2.86432 0.678733L11.2857 9.31918C11.6775 9.72118 12.3234 9.722 12.7162 9.32099L21.1356 0.726115C21.5278 0.325821 22.1722 0.325821 22.5644 0.726114L23.3131 1.49042C23.6945 1.87979 23.6938 2.5029 23.3116 2.89147L12.7144 13.6644Z' fill='white'/%3E%3C/svg%3E%0A") 50% 50% / 100% auto no-repeat;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      transition: all 0.25s ease;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.4);
    }

    &.folded .icon {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  &__fold {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__empty-notice {
    user-select: none;
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
