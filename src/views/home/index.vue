<template>
  <div class="home">
    <EmojiCreator class="home__emoji-creator" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmojiCreator from './components/emojiCreator.vue'

export default defineComponent({
  name: 'HomePage',
  components: { EmojiCreator },

  data() {
    return {}
  },
})
</script>
<style lang="stylus" scoped>
.home {
  padding: 50px 0;
  flex-basis: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  position: relative;

  &__emoji-creator {
    max-width: 680px;
  }
}
</style>
