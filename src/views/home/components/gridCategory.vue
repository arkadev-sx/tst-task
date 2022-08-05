<template>
  <div :class="['category', { ['empty']: isEmptyBlock }]">
    <div :class="['category__head']">
      <div :class="['category__switch', { ['folded']: !isOpen }]" @click="toggle">
        <div class="icon"></div>
      </div>
      <div class="category__title" @click="toggle">{{ title }}</div>

      <div class="category__icon" :style="`background-image: url(${icon})`" @click="toggle"></div>
    </div>
    <div class="category__box">
      <slide-up-down
        ref="expand"
        v-model="isOpen"
        :duration="220"
        :class="['category__fold', { ['fixed']: heightFix && !isEmptyBlock }]"
        @open-end="fixExpand(true)"
        @close-start="fixExpand(false)"
      >
        <div class="category__list-wrp">
          <div v-if="isEmptyBlock" :class="['category__empty-notice']">
            there is no availible goods for this category
          </div>
          <slot></slot>
        </div>
      </slide-up-down>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SlideUpDown from 'vue3-slide-up-down'
import { getIconForCategory } from '../../../helpers/getIconByCatId'

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
    catId: {
      type: String,
      default: '9991',
    },
  },
  data() {
    return {
      isOpen: true,
      icon: ``,
      heightFix: true,
    }
  },
  beforeMount() {
    if (this.isEmptyBlock) {
      this.isOpen = false
      this.icon = getIconForCategory(9991)
    } else {
      this.icon = getIconForCategory(this.catId)
    }
  },
  methods: {
    fixExpand(isOn: boolean) {
      this.heightFix = isOn
    },
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
})
</script>
<style lang="stylus">
.category {
  padding: 15px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dadada;

  &.empty {
    .category {
      &__title, &__switch, &__icon {
        opacity: 0.5;
      }
    }
  }

  &__head {
    width: 100%;
    font-size: 22px;
    font-weight: 600;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__title {
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  &__switch {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    transition: all 0.25s ease;
    position: relative;
    cursor: pointer;

    .icon {
      width: 20px;
      height: 20px;
      background: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.7144 21.6644C15.322 22.0633 14.6787 22.0626 14.2871 21.6629L3.6855 10.8404C3.30464 10.4516 3.30464 9.82963 3.6855 9.44084L4.43383 8.67692C4.82665 8.27592 5.47251 8.27674 5.86432 8.67873L14.2857 17.3192C14.6775 17.7212 15.3233 17.722 15.7162 17.321L24.1356 8.72611C24.5278 8.32582 25.1722 8.32582 25.5644 8.72611L26.3131 9.49042C26.6945 9.87979 26.6938 10.5029 26.3116 10.8915L15.7144 21.6644Z' fill='%23333333'/%3E%3C/svg%3E%0A") 50% 50% / 100% auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      transition: all 0.25s ease;
    }

    &:hover {
      background-color: #d8d8d8;
    }

    &:active {
      background-color: #c6c6c6;
    }

    &.folded .icon {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  &__icon {
    margin-left: auto;
    width: 40px;
    height: 40px;
    transition: all 0.25s ease;
    cursor: pointer;
    border-radius: 6px;
    background: 50% 50% / 35px auto no-repeat;

    &:hover {
      opacity: 0.6;
    }

    &:active {
      transform: translateY(1px);
    }
  }

  &__fold {
    &.fixed {
      height: auto !important;
    }
  }

  &__list-wrp {
    padding-top: 20px;
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
