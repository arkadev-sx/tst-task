<template>
  <div :class="['popup', { ['active']: setupLocalData.popupIsVisible }]">
    <div class="icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useMainStore } from '../../../stores/main'

export default defineComponent({
  name: 'RefreshPopup',

  setup(_, context) {
    const mainStore = useMainStore()
    let setupLocalData = reactive({ popupIsVisible: false })
    context.expose({
      setupLocalData,
    })

    const unsubscribe = mainStore.$onAction(
      ({
        name, // name of the action
        after,
      }) => {
        // a shared variable for this specific action call
        if (name === 'updateAllData') {
          after(() => {
            setupLocalData.popupIsVisible = true
            setTimeout(() => {
              setupLocalData.popupIsVisible = false
            }, 2500)
          })
        }
      }
    )

    return { mainStore, unsubscribe, setupLocalData }
  },
})
</script>
<style lang="stylus">
.popup {
  width: 35px;
  height: 35px;
  background: rgba(7 245 119 0.8);
  border-radius: 6px;
  transition: opacity 0.5s ease;
  opacity: 0;

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    background: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.35 32V29H6.85L6.1 28.4C3.96667 26.7 2.41667 24.85 1.45 22.85C0.483333 20.85 0 18.6167 0 16.15C0 12.6167 1.04167 9.44167 3.125 6.625C5.20833 3.80833 7.95 1.86667 11.35 0.8V3.9C8.85 4.86667 6.83333 6.475 5.3 8.725C3.76667 10.975 3 13.45 3 16.15C3 18.25 3.39167 20.075 4.175 21.625C4.95833 23.175 6.01667 24.5167 7.35 25.65L8.85 26.7V20.5H11.85V32H0.35ZM20.7 31.25V28.1C23.2333 27.1333 25.25 25.525 26.75 23.275C28.25 21.025 29 18.55 29 15.85C29 14.25 28.6083 12.625 27.825 10.975C27.0417 9.325 26.0167 7.86667 24.75 6.6L23.3 5.3V11.5H20.3V0H31.8V3H25.25L26 3.7C28 5.56667 29.5 7.56667 30.5 9.7C31.5 11.8333 32 13.8833 32 15.85C32 19.3833 30.9667 22.5667 28.9 25.4C26.8333 28.2333 24.1 30.1833 20.7 31.25V31.25Z' fill='white'/%3E%3C/svg%3E%0A") 50% 50% / 100% auto no-repeat;
    opacity: 0.7;
    animation: rotate 2s linear infinite;
  }

  &.active {
    opacity: 1;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  50% {
    transform: translate(-50%, -50%) rotate(-180deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>
