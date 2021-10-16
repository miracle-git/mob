<template>
  <view class="goods-detail-page" v-if="goods.goods_name">
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in goods.pics" :key="index">
        <image :src="item.pics_big" @click="handlePreviewImage(index)"/>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-box">
      <text class="goods-price">{{goods.goods_price | toFixed}}</text>
      <view class="goods-info">
        <text class="goods-name">{{goods.goods_name}}</text>
        <view class="goods-icon">
          <uni-icons type="star" size="18" color="#808080"/>
          <text>收藏</text>
        </view>
      </view>
      <text class="goods-fee">快递：免运费</text>
    </view>
    <!-- 商品详情 -->
    <rich-text :nodes="goods.goods_introduce"/>
    <!-- 商品导航 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="config.options" :button-group="config.buttons" @click="handleOptionClick" @buttonClick="handleButtonClick" />
    </view>
  </view>
</template>

<script>
  import { getGoodsDetail } from '@/services/goods.service'
  
  export default {
    data() {
      return {
        goods: {},
        config: {
          options: [
            { icon: 'shop', text: '店铺', type: 'shop' },
            { icon: 'cart', text: '购物车', type: 'cart', info: 2 }
          ],
          buttons: [
            { color: '#fff', type: 'add', backgroundColor: '#ff0000', text: '加入购物车' },
            { color: '#fff', type: 'buy', backgroundColor: '#ffa200', text: '立即购买' }
          ]
        }
      }
    },
    filters: {
      toFixed(num) {
        return `¥${Number(num).toFixed(2)}`
      }
    },
    onLoad(options) {
      this.initPage(options.id)
    },
    methods: {
      async initPage(id) {
        const { data: res } = await getGoodsDetail(id)
        this.goods = { 
          ...res.message,
          goods_introduce: this.handleImageData(res.message.goods_introduce)
        }
      },
      handlePreviewImage(index) {
        uni.previewImage({
          current: index,
          urls: this.goods.pics.map(item => item.pics_big)
        })
      },
      handleImageData(img) {
        return img.replace(/<img /g, '<img style="vertical-align:middle;" ').replace(/\.webp/g, '.jpg')
      },
      handleOptionClick(e) {
        const { type } = e.content
        if (type === 'cart') {
          uni.switchTab({
            url: '/pages/cart/index'
          })
        }
      },
      handleButtonClick() {}
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
