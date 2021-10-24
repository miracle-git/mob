export default {
  filters: {
    toFixed(num) {
      return `¥${Number(num).toFixed(2)}`
    }
  }
}