<template>
  <div :class="['panel']">
    <div
      :class="['btn btn_shift', { ['delete']: qtyInCart === 1, ['disabled']: qtyInCart === 0 }]"
      @click="inputVal--"
    ></div>
    <Field
      ref="field"
      v-model.trim="inputVal"
      :class="['panel__input', { ['error']: showError }]"
      type="text"
      name="qty"
      :rules="validateInput"
      autocomplete="off"
    />
    <div
      :class="['btn btn_add', { ['disabled']: availibleAmountToAdd === 0 }]"
      @click="inputVal++"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vee-validate'

export default defineComponent({
  name: 'ItemControls',
  components: { Field },

  props: {
    total: {
      type: Number,
      default: 1,
    },
    availibleAmountToAdd: {
      type: Number,
      default: 1,
    },
    qtyInCart: {
      type: Number,
      default: 1,
    },
  },

  emits: ['update'],

  data() {
    return {
      inputVal: 0,
      showError: false,
      processedValue: null,
    }
  },

  watch: {
    processedValue(nv) {
      this.$emit('update', nv)
    },
    qtyInCart(nv) {
      this.inputVal = nv
    },
  },
  beforeMount() {
    this.inputVal = this.qtyInCart
  },
  methods: {
    validateInput(val) {
      const REGEX_POSITIVE_INTEGER = /^\d+$/
      const isZeroInStart = val[0] === '0' && val.length > 1

      const checkLimit = (val, limit) => {
        if (val > limit) {
          return false
        }
        return true
      }

      if (REGEX_POSITIVE_INTEGER.test(val)) {
        if (isZeroInStart) {
          this.showError = true
          if (val[1]) {
            this.inputVal = val.substr(1)
          } else {
            this.inputVal = 0
          }
        } else {
          this.showError = false
        }
        if (!checkLimit(val, this.total)) {
          this.showError = true
          this.inputVal = this.total
        } else {
          this.showError = false
        }
      } else {
        this.showError = true
        this.inputVal = 1
      }
      this.processedValue = Number(this.inputVal)
    },
  },
})
</script>

<style lang="stylus">
.panel {
  display: flex;
  align-items: center;
  gap: 7px;
  position: relative;

  &.disabled {
    opacity: 0;
    pointer-events: none;
  }

  .btn {
    width: 35px;
    height: 35px;
    border-radius: 7px;
    cursor: pointer;
    background: grey 50% 50% / 100% auto no-repeat;
    transition: opacity 0.25s ease, background-image 0.25s ease;

    &:hover {
      opacity: 0.8;
    }

    &_shift {
      background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 25.5V22.5H38V25.5H10Z' fill='white'/%3E%3C/svg%3E%0A");

      &.delete {
        background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.05 42C12.25 42 11.55 41.7 10.95 41.1C10.35 40.5 10.05 39.8 10.05 39V10.5H8V7.5H17.4V6H30.6V7.5H40V10.5H37.95V39C37.95 39.8 37.65 40.5 37.05 41.1C36.45 41.7 35.75 42 34.95 42H13.05ZM34.95 10.5H13.05V39H34.95V10.5ZM18.35 34.7H21.35V14.75H18.35V34.7ZM26.65 34.7H29.65V14.75H26.65V34.7Z' fill='%23FF0000'/%3E%3C/svg%3E%0A");
        background-size: 24px auto;
      }

      &.disabled {
        pointer-events: none;
        opacity: 0.7;
      }
    }

    &_add {
      background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.5 38V25.5H10V22.5H22.5V10H25.5V22.5H38V25.5H25.5V38H22.5Z' fill='white'/%3E%3C/svg%3E%0A");

      &.disabled {
        pointer-events: none;
        opacity: 0.7;
      }
    }
  }

  &__input {
    width: 50px;
    height: 33px;
    border: none;
    appearance: none;
    font-size: 16px;
    font-weight: 400;
    color: #444;
    text-align: center;
    border-radius: 4px;
    border: 1.5px solid #fff;
    transition: all 0.25s ease;

    &:focus, &:active {
      outline: transparent;
    }

    &.error {
      border-color: #ff0000;
    }

    &::placeholder {
      color: #dedede;
    }

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
