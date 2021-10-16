<template>
  <view class="home-page">
    <!-- 搜索框 -->
    <view class="search-box">
      <app-search-box/>
    </view>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods-detail/index?id=${item.goods_id}`">
          <image :src="item.image_src"/>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="cate-list">
      <view class="cate-item" v-for="(item, index) in categoryList" :key="index" @click="handleCateItem(item)">
        <image :src="item.image_src"/>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" :alt="item.floor_title.name" class="floor-title"/>
        <view class="floor-imgbox">
          <navigator class="floor-img-left" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :alt="item.product_list[0].name" 
                   :style="{'width':`${item.product_list[0].image_width}rpx`}" mode="widthFix"/>
          </navigator>
          <view class="floor-img-right">
            <block v-for="(product, pindex) in item.product_list.slice(1)" :key="pindex" >
              <navigator class="floor-img-item" :url="product.url">
                <image :src="product.image_src" :style="{'width':`${product.image_width}rpx`}" mode="widthFix"/>
              </navigator>
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getSwiperList, getCategoryList, getFloorList } from '@/services/home.service'
  
  export default {
    data() {
      return {
        swiperList: [],
        categoryList: [],
        floorList: []
      }
    },
    onLoad() {
      this.initPage()
    },
    methods: {
      async initPage() {
        const { data: swiper } = await getSwiperList()
        const { data: category } = await getCategoryList()
        const { data: floor } = await getFloorList()
        
        this.swiperList = swiper.message
        this.categoryList = category.message
        this.floorList = this.handleFloorData(floor.message)
      },
      handleCateItem(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '../cate/index'
          })
        }
      },
      handleFloorData(data) {
        return data.map(item => {
          item.product_list = item.product_list.map(product => ({
            ...product,
            url: `/subpkg/goods-list/index?${product.navigator_url.split('?')[1]}`
          }))
          return item
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
