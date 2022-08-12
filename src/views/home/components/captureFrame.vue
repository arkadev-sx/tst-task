<template>
  <div class="capture-frame">
    <div class="capture-frame__video-box">
      <video ref="video" @canplay="ininCanvas">stream capture is unavailable</video>
    </div>
    <button class="capture-frame__button">take shot</button>
    <div class="capture-frame__result-box">
      <canvas ref="canvas"></canvas>
      <button>retake</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaptureFrame',
  data() {
    return {
      video: null,
      canvas: null,
    }
  },
  mounted() {
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
    this.initCapture()
  },
  methods: {
    getStream() {
      return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    },
    async initCapture() {
      try {
        const stream = await this.getStream()
        this.video.srcObject = stream
        this.video.play()
      } catch (err) {
        console.log(err)
      }
    },
    initCanvas() {
      this.canvas.setAttribute('width', this.video.videoWidth)
      this.canvas.setAttribute('height', this.video.videoHeight)
    },
  },
}
</script>

<style lang="stylus" scoped>
.capture-frame {
  position: relative;

  &__video-box {
    width: 100%;

    video {
      width: 100%;
      background: url('https://leonardo.osnova.io/9a3a414b-176a-5071-969a-ee5d8b305cb1/') 50% 50% / 100% auto no-repeat; // leonardo.osnova.io/9a3a414b-176a-5071-969a-ee5d8b305cb1/) 50% 50%/100% auto no-repeat
      border-radius: 11px;
    }
  }

  &__result-box {
    position: absolute;
    width: 100%;
    height: 100%;
    left 0
    top 0
    background: red;
    opacity 0
    pointer-events: none
  }
}
</style>
