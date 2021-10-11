<template>
  <view class="app-search-box" :style="{'background-color':bgcolor}" @click="handleSearchBox">
    <view class="search-container" :style="{'border-radius':`${radius}px`}">
      <uni-icons type="search" size="16"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "app-search-box",
    props: {
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 16
      }
    },
    methods: {
      handleSearchBox() {
        uni.navigateTo({
          url: '/subpkg/search/index'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
