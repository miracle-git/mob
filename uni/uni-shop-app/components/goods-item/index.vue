<template>
  <view class="app-goods-item" @click="handleGoodsItem(item)">
    <view class="goods-item-left">
      <radio v-if="radio" :checked="item.goods_state" color="#C00000" 
             @click.stop="$emit('radio-change', { id: item.goods_id, checked: item.goods_state })"/>
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"/>
    </view>
    <view class="goods-item-right">
      <text class="goods-name">{{item.goods_name}}</text>
      <view class="goods-info">
        <text class="goods-price">{{item.goods_price | toFixed}}</text>
        <view class="goods-number-box" v-if="number" @click.stop>
          <uni-number-box :min="1" :value="item.goods_count"
                          @change="val=>$emit('number-change', { id: item.goods_id, num: +val })"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { price, picture } from '@/mixins'
  
  export default {
    name: 'app-goods-item',
    mixins: [price, picture],
    props: {
      item: {
        type: Object,
        required: true
      },
      radio: {
        type: Boolean,
        default: false
      },
      number: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
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
