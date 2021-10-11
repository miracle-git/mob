<template>
  <view class="cate-page">
    <!-- 搜索框 -->
    <app-search-box/>
    <view class="cate-scroll-container">
      <!-- 主分类 -->
      <scroll-view class="cate-left" scroll-y="true" :style="{'height':`${height}px`}">
        <block v-for="(item, index) in categoryList" :key="index">
          <view class="cate-left-item" :class="{'active':active===index}" @click="handleCateItem(index)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 二级分类 -->
      <scroll-view class="cate-right" scroll-y="true" :style="{'height':`${height}px`}" :scroll-top="scrollTop">
        <block v-for="(item, index) in subCateList" :key="index">
          <view class="cate-right-item" v-if="item.children&&item.children.length">
            <view class="cate-item-title">/ {{item.cat_name }} /</view>
            <!-- 三级分类 -->
            <view class="cate-list">
              <block v-for="(child, cindex) in item.children" :key="cindex">
                <view class="cate-list-item" @click="handleSubItem(child)">
                  <image :src="child.cat_icon"></image>
                  <text>{{child.cat_name}}</text>
                </view>
              </block>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import { getCategoryList } from '@/services/cate.service'

  export default {
    data() {
      return {
        height: 0,
        active: 0,
        scrollTop: 0,
        categoryList: [],
        subCateList: []
      }
    },
    onLoad() {
      const { windowHeight } = uni.getSystemInfoSync()
      this.height = windowHeight - 50
      this.initPage()
    },
    methods: {
      async initPage() {
        const { data: category } = await getCategoryList()
        this.categoryList = category.message
        this.subCateList = this.categoryList[this.active].children
      },
      handleCateItem(index) {
        this.active = index
        this.subCateList = this.categoryList[index].children
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      handleSubItem(item) {
        uni.navigateTo({
          url: `/subpkg/goods-list/index?cid=${item.cat_id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
