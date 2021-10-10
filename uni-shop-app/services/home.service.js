export const getSwiperList = () => uni.$http.get('/api/public/v1/home/swiperdata')
export const getCategoryList = () => uni.$http.get('/api/public/v1/home/catitems')
export const getFloorList = () => uni.$http.get('/api/public/v1/home/floordata')