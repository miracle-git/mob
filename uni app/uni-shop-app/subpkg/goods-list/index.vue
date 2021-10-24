<template>
  <view class="goods-list-page">
    <view class="goods-list">
      <block v-for="(item, index) in goodsList" :key="index">
        <app-goods-item :item="item"/>
      </block>
    </view>
    <app-block-text :text="moreText"/>
  </view>
</template>

<script>
  import { getGoodsList } from '@/services/goods.service'
  
  export default {
    data() {
      return {
        params: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        loading: false,
        goodsList: [],
        total: 0
      }
    },
    computed: {
      hasMore() {
        return this.params.pagenum * this.params.pagesize < this.total
      },
      moreText() {
        if (this.params.pagenum === 1) return ''
        if (this.loading) return '加载中...'
        return this.hasMore ? '' : '已经到底了'
      }
    },
    onLoad(options) {
      this.params = { ...this.params, ...options }
      this.initPage()
    },
    onPullDownRefresh() {
      this.params.pagenum = 1
      this.total = 0
      this.loading = false
      this.goodsList = []
      this.initPage(uni.stopPullDownRefresh)
    },
    onReachBottom() {
      if (this.loading || !this.hasMore) return 
      this.params.pagenum++
      this.initPage()
    },
    methods: {
      async initPage(refresh) {
        this.loading = true
        const { data: res } = await getGoodsList(this.params)
        refresh && refresh()
        this.loading = false
        this.goodsList = [...this.goodsList, ...res.message.goods]
        // this.total = res.message.total
        this.total = 20 // 后端接口有些问题，因此这里只加载前两页
      }
    }
  }
</script>