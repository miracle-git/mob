<template>
  <view class="app-search-box" :style="{'background-color':bgcolor}" @click="handleSearchBox">
    <view class="search-container" :style="{'border-radius':`${radius}px`}">
      <uni-icons type="search" color="#808080" size="16"></uni-icons>
      <text class="placeholder">输入关键字搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'app-search-box',
    props: {
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 100
      }
    },
    methods: {
      handleSearchBox() {
        uni.navigateTo({
          url: '/subpkg/search-bar/index'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
