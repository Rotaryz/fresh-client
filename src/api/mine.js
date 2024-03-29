import request from '@utils/request'

export default {
  getShopDetail(loading = false) {
    let url = '/api/wap/shop-detail'
    return request.get(url, null, loading)
  },
  getShopList(data, loading = true) {
    let url = '/api/wap/shop-list'
    return request.get(url, data, loading)
  },
  getWechatMobile(data, loading = false) {
    let url = '/api/wap/customer-wechat-mobile'
    return request.post(url, data, loading)
  },
  getOrderCount(loading = false) {
    let url = '/api/wap/customer-order-group-count'
    return request.get(url, null, loading)
  },
  getAfterOrderCount(loading = false) {
    let url = '/api/wap/customer-after-sale-orders-count'
    return request.get(url, null, loading)
  },
  /**
   * 邀请有礼是否开启[v2.6.2]
   * @param loading
   */
  activityInviteEnable(loading = false) {
    let url = '/api/wap/coupon-activity-manage/activity-invite-enable/0'
    return request.get(url, null, loading)
  }
}
