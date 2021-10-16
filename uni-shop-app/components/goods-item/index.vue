<template>
  <view class="app-goods-item" @click="handleGoodsItem(item)">
    <view class="goods-item-left">
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <text class="goods-name">{{item.goods_name}}</text>
      <view class="goods-info">
        <text class="goods-price">{{item.goods_price | toFixed}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'app-goods-item',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    filters: {
      toFixed(num) {
        return `¥${Number(num).toFixed(2)}`
      }
    },
    methods: {
      handleGoodsItem(item) {
        uni.navigateTo({
          url: `/subpkg/goods-detail/index?id=${item.goods_id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
