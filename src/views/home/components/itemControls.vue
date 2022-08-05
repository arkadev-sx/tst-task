<template>
  <div :class="['panel']">
    <!-- переписать div на button -->
    <button
      :class="['btn btn_shift', { ['delete']: qtyInCart === 1, ['disabled']: qtyInCart === 0 }]"
      @click="buttonHandle('decrement')"
    ></button>
    <input
      ref="field"
      v-model.trim="inputVal"
      type="text"
      :class="['panel__input', { ['error']: showError }]"
      name="qty"
      autocomplete="off"
      @input="validateInput"
      @blur="validateBlur"
    />
    <button
      :class="['btn btn_add', { ['disabled']: availibleAmountToAdd === 0 }]"
      @click="buttonHandle('increment')"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemControls',

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
      processedValue: 1,
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
    buttonHandle(mode: string) {
      if (mode === 'increment') {
        this.inputVal++
      }
      if (mode === 'decrement') {
        this.inputVal--
      }
      this.processedValue = this.inputVal
    },
    validateValueRegex(val: string | number) {
      const valString = val.toString()
      const valNumberSymbolsRemoved = valString.replace(/[^0-9]/g, '')
      const valNumberZerosAtStartRemoved =
        valNumberSymbolsRemoved.length > 1
          ? valNumberSymbolsRemoved.replace(/^0+/, '')
          : valNumberSymbolsRemoved
      return valNumberZerosAtStartRemoved
    },
    validateBlur(e: Event) {
      const target = e.target as HTMLInputElement
      const val = target.value ? target.value : 0
      this.inputVal = Number(val)
      this.processedValue = this.inputVal
    },
    validateInput(e: Event) {
      const target = e.target as HTMLInputElement
      const val = Number(this.validateValueRegex(target.value))
      this.inputVal = val > this.total ? this.total : val

      if (val > 0) {
        this.processedValue = this.inputVal
      }
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
    width: 32px;
    height: 32px;
    border-radius: 7px;
    cursor: pointer;
    background: #808080 50% 50% / contain no-repeat;
    transition: opacity .25s linear;
    appearance: none;
    border: none;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      transform: translateY(1px);
      opacity: 0.9;
    }

    &_shift {
      background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 25.5V22.5H38V25.5H10Z' fill='white'/%3E%3C/svg%3E%0A");

      &.delete {
        background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.84063 26.25C9.39063 26.25 8.99687 26.0812 8.65937 25.7437C8.32187 25.4062 8.15313 25.0125 8.15313 24.5625V8.53125H7V6.84375H12.2875V6H19.7125V6.84375H25V8.53125H23.8469V24.5625C23.8469 25.0125 23.6781 25.4062 23.3406 25.7437C23.0031 26.0812 22.6094 26.25 22.1594 26.25H9.84063ZM22.1594 8.53125H9.84063V24.5625H22.1594V8.53125ZM12.8219 22.1438H14.5094V10.9219H12.8219V22.1438ZM17.4906 22.1438H19.1781V10.9219H17.4906V22.1438Z' fill='white'/%3E%3C/svg%3E%0A");

        &:hover {
          background-color: #DE6C6C;
        }
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
    height: 32px;
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
