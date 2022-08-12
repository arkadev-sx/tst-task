<template>
  <div class="emoji-creator">
    <div class="emoji-creator__title">{{ textContent.title }}</div>
    <StatusBar class="emoji-creator__status-bar" />
    <div class="emoji-creator__container">
      <!-- <div class="emoji-creator__box">select an emoji</div> -->
      <div class="emoji-creator__box"><CaptureFrame /></div>
      <!-- <div class="emoji-creator__box">download result</div> -->
    </div>
  </div>
</template>

<script>
import StatusBar from './statusBar.vue'
import CaptureFrame from './captureFrame.vue'

export default {
  components: { StatusBar, CaptureFrame },
  data() {
    return {
      textContent: {
        title: 'emoji-creator v.1.0',
      },
    }
  },
}
</script>

<style lang="stylus" scoped>
.emoji-creator {
  padding: 20px 15px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #fefefe;

  &__title{
    margin-bottom 32px
    font-size 18px
    line-height 20px
    font-weight 500
  }
  &__status-bar{
    padding 10px
    border-radius: 13px
    border: 1px solid #999
  }

  &__container{
    margin-top 16px
    border-radius: 13px
    border: 1px solid #999
  }
  &__box{
    width 100%
    padding 10px
  }
}
</style>
