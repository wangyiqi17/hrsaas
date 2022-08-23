<template>
  <div style="margin: 0 8px">
    <svg-icon
      className="fullName"
      iconClass="fullscreen"
      style="color: #fff"
      @click="onFullScreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
