<template>
  <view class="search-page">
    <view class="search-bar">
      <uni-search-bar @input="handleInput" cancel-button="none" placeholder="输入关键字搜索" :radius="100"/>
    </view>
    <!-- 搜索建议列表 -->
    <view class="suggest-list" v-if="suggestList.length">
      <view class="suggest-item" v-for="(item, index) in suggestList" :key="index" @click="handleSuggestItem(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"/>
      </view>
    </view>
    <!-- 搜索历史列表 -->
    <view class="history-box" v-else>
      <view v-if="historyList.length">
        <view class="history-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="16" @click="handleClearHistory"/>
        </view>
        <view class="history-list">
          <uni-tag v-for="(item, index) in historyList" :key="index" :text="item" @click="handleHistoryItem(item)"/>
        </view>
      </view>
      <text class="no-data" v-else>暂无搜索历史</text>
    </view>
  </view>
</template>

<script>
  import { getSuggestList } from '@/services/goods.service'
  
  export default {
    data() {
      return {
        timer: null,
        keyword: '',
        cacheKey: 'uni-shop-keywords',
        suggestList: [],
        historyList: []
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync(this.cacheKey) || '[]')
    },
    methods: {
      handleInput(val) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          this.keyword = val
          if (!this.keyword.length) {
            this.suggestList = []
            return
          }
          const { data: res } = await getSuggestList(this.keyword)
          this.suggestList = res.message
          this.handleSaveHistory()
        }, 500)
      },
      handleSuggestItem(item) {
        uni.navigateTo({
          url: `/subpkg/goods-detail/index?id=${item.goods_id}`
        })
      },
      handleSaveHistory() {
        if (!this.suggestList.length) return
        if (this.historyList.indexOf(this.keyword) < 0) {
          this.historyList.unshift(this.keyword)
        }
        uni.setStorageSync(this.cacheKey, JSON.stringify(this.historyList))
      },
      handleClearHistory() {
        this.historyList = []
        uni.setStorageSync(this.cacheKey, '[]')
      },
      handleHistoryItem(item) {
        uni.navigateTo({
          url: `/subpkg/goods-list/index?query=${item}`
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
