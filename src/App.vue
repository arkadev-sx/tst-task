<template>
  <ContentArea :class="'app__content-area'"><Home /></ContentArea>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentArea from './components/contentArea.vue'
import Home from './views/home/index.vue'

export default defineComponent({
  name: 'App',
  components: { ContentArea, Home },
  methods: {},
})
</script>

<style lang="stylus">
@import './assets/styles/main.styl';

.app {
  &__content-area {
    grid-area: 1 / 1;
  }
}
</style>
