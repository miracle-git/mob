<template>
  <text class="app-block-text">{{text}}</text>
</template>

<script>
  export default {
    name: 'app-block-text',
    props: {
      text: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>