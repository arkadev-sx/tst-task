<template>
  <main :class="'content-area'">
    <div :class="'content-wrp'">
      <slot></slot>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentArea',
})
</script>

<style lang="stylus">
@import '../assets/styles/constants.styl';

.content-area {
  display: grid;
  grid-template-columns: $grid-horisontal-padding-d 1fr $grid-horisontal-padding-d;
  grid-template-rows: 100%;
  position: relative;
}
</style>
