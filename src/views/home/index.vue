<template>
  <div class="home">
    <Popup class="home__popup" />
    <div class="home__box home__box_grid"><Grid /></div>
    <div class="home__box home__box_cart"><Cart /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useMainStore } from '../../stores/main'
import Grid from './components/goodsGrid.vue'
import Cart from './components/cart.vue'
import Popup from './components/refreshPopup.vue'

export default defineComponent({
  name: 'HomePage',
  components: { Grid, Popup, Cart },

  setup() {
    const mainStore = useMainStore()
    const updateData = mainStore.updateAllData
    onMounted(updateData)
    return { updateData }
  },
  data() {
    return {
      UPDATE_TIMEOIT: process.env.MEOW_REFRESH_TIMEOUT,
      interval: 0,
    }
  },

  mounted() {
    this.interval = setInterval(this.updateData, this.UPDATE_TIMEOIT)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
})
</script>
<style lang="stylus" scoped>
.home {
  padding: 50px 0;
  flex-basis: 100%;
  display: flex;
  align-items: flex-start;
  gap: 30px;
  position: relative;

  &__box {
    &_grid {
      flex-basis: 65%;
    }

    &_cart {
      border-radius: 16px;
      padding: 20px 15px;
      flex-basis: 35%;
      background-color: #d8d8d8;
    }
  }

  &__popup {
    position: absolute;
    top: 10px;
    right: 0;
  }
}
</style>
