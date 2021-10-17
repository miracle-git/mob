<template>
  <view class="goods-detail-page" v-if="goods.goods_name">
    <!-- 轮播图 -->
    <view class="swiper-box">
      <swiper indicator-dots autoplay circular :interval="3000" :duration="1000" v-if="goods.pics&&goods.pics.length">
        <swiper-item v-for="(item, index) in goods.pics" :key="index">
          <image :src="item.pics_big" @click="handlePreviewImage(index)"/>
        </swiper-item>
      </swiper>
      <image class="goods-pic" :src="defaultPic" v-else/>
    </view>
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
      <uni-goods-nav :fill="true" :options="config.options" :button-group="config.buttons" 
                     @click="handleOptionClick" @buttonClick="handleButtonClick"/>
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { price, picture } from '@/mixins'
  import { getGoodsDetail } from '@/services/goods.service'
  
  export default {
    mixins: [price, picture],
    data() {
      return {
        goods: {},
        config: {
          options: [
            { icon: 'shop', text: '店铺', type: 'shop' },
            { icon: 'cart', text: '购物车', type: 'cart', info: 0 }
          ],
          buttons: [
            { color: '#fff', type: 'add', backgroundColor: '#ff0000', text: '加入购物车' },
            { color: '#fff', type: 'buy', backgroundColor: '#ffa200', text: '立即购买' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters('cart', ['total'])
    },
    watch: {
      total: {
        handler(val) {
          const res = this.config.options.find(item => item.type === 'cart')
          res.info = val
        },
        immediate: true
      }
    },
    onLoad(options) {
      this.initPage(options.id)
    },
    methods: {
      ...mapMutations('cart', ['addToCart']),
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
      handleButtonClick(e) {
        const { goods_id, goods_name, goods_price, goods_small_logo } = this.goods
        const { type } = e.content
        if (type === 'add') {
          this.addToCart({
            goods_id,
            goods_name,
            goods_price,
            goods_count: 1,
            goods_small_logo,
            goods_state: true
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
