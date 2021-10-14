<template>
  <view class="search-page">
    <view class="search-bar">
      <uni-search-bar @input="handleInput" cancel-button="none" placeholder="输入关键字搜索" :radius="100"/>
    </view>
    <!-- 搜索建议列表 -->
    <view class="suggest-list" v-if="keyword">
      <view class="suggest-item" v-for="(item, index) in suggestList" :key="index" @click="handleSuggestItem(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"/>
      </view>
    </view>
    <!-- 搜索历史列表 -->
    <view class="history-list" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="18"/>
      </view>
      <view class="history-content">
        <uni-tag v-for="(item, index) in historyList" :key="index" :text="item"/>
      </view>
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
        suggestList: [],
        historyList: ['a', 'b', 'c']
      }
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
        }, 500)
      },
      handleSuggestItem(item) {
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
