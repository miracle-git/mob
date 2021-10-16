export const getSuggestList = (keyword) => uni.$http.get('/api/public/v1/goods/qsearch', { query: keyword })
export const getGoodsList = (params) => uni.$http.get('/api/public/v1/goods/search', params)
export const getGoodsDetail = (id) => uni.$http.get('/api/public/v1/goods/detail', { goods_id: id }) 