import request from './request-handler'

export default {
  // 用户优惠券列表
  getClientList(data, loading, toast) {
    const url = `/api/wap/coupon/customer-coupon`
    return request.get({url, data, loading, toast})
  },
  // 客户优惠券可使用的商品列表[v2.1]
  getGoodsList(data, loading, toast) {
    const url = `/api/wap/goods/customer-coupon-goods`
    return request.get({url, data, loading, toast})
  },
  // 获取团长优惠券营销列表
  getMarketList(data, loading, toast) {
    const url = `/api/wap/coupon-activity-manage/coupon-allocation-list`
    return request.get({url, data, loading, toast})
  },
  // 首页发优惠券（新客户与沉睡客户）
  getModalList(data, loading = false, toast = false) {
    const url = `/api/wap/coupon-activity-manage/receive-coupon-home-page`
    return request.post({url, data, loading, toast})
  },
  // 标记已读-首页优惠券
  targetModal(data, loading = false, toast = false) {
    const url = `/api/wap/coupon-activity-manage/read-coupon-activity`
    return request.post({url, data, loading, toast})
  },
  // 团长生成营销优惠券包
  createPacket(data, loading, toast) {
    const url = `/api/wap/coupon-activity-manage/create-shop-coupon-bag/${data.couponId}`
    return request.post({url, data, loading, toast})
  },
  // 团长营销优惠券包详情
  getPacketDetail(data, loading, toast) {
    const url = `/api/wap/coupon-activity-manage/shop-coupon-bag-detail/${data.packetId}`
    data = ''
    return request.get({url, data, loading, toast})
  },
  // 抢优惠券记录
  getTakeList(data, loading = false, toast = false) {
    const url = `/api/wap/coupon-activity-manage/receive-coupon-logs/${data.packetId}`
    data = ''
    return request.get({url, data, loading, toast})
  },
  // 抢优惠券
  takeCoupon(data, loading, toast) {
    const url = `/api/wap/coupon-activity-manage/receive-coupon-by-bag/${data.packetId}`
    data = ''
    return request.post({url, data, loading, toast})
  },
  // 获取营销优惠券包状态
  getPacketStatus(data, loading = false, toast = false) {
    const url = `/api/wap/coupon-activity-manage/get-shop-bag-status/${data.packetId}`
    data = ''
    return request.get({url, data, loading, toast})
  }
}