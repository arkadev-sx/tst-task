<template>
  <div class="status-bar">
    <div v-for="point in points" :key="point.title" class="status-bar__point">
      <div class="point-icon">{{ point.icon }}</div>
      <div class="point__title">{{ point.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: {
        choose: {
          icon: '🔎',
          title: 'choose an emoji',
        },
        upload: {
          icon: '📸',
          title: 'take or upload image',
        },
        done: {
          icon: '✅',
          title: 'download brand new emoji',
        },
      },
    }
  },
}
</script>

<style lang="stylus" scoped>
.status-bar{
    padding 10px
    border-radius: 13px
    border: 1px solid #999
    display grid
    grid-template-columns: 1fr 1fr 1fr
    grid-auto-columns: 1fr
    grid-template-rows: auto
    gap: 10px


    .point{
        user-select: none

        &__title{
            transition: all .25s ease
            opacity 0
        }
    }
}
</style>
