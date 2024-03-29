import request from '@utils/request'

/**
 * 团长模块
 */
export default {
  /**
   * 团长登录
   * @param data
   * @param loading
   * @returns {*}
   */
  loginLeader(data, loading) {
    const url = `/api/wap/shop-manager-login`
    return request.post(url, data, loading)
  },
  /**
   * 获取二维码
   * @param data
   * @param loading
   * @returns {*}
   */
  messageBind(data, loading) {
    const url = `/api/wap/message-bind`
    return request.post(url, data, loading)
  },
  /**
   * 团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  leaderDetail(data = {}, loading = false) {
    const url = `/api/wap/shop-manager/shop-manager-detail`
    return request.get(url, data, loading)
  },
  /**
   * 团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  saveLeader(data, loading = true) {
    const url = `/api/wap/shop-manager/shop-manager-update`
    return request.post(url, data, loading)
  },
  /**
   * 团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  recommendGoods(data, loading = false) {
    const url = `/api/wap/goods/hot-goods`
    return request.get(url, data, loading)
  },
  /**
   * 获取团长统计信息
   * @param data
   * @param loading
   * @returns {*}
   */
  leaderOrderTotal(loading = false) {
    const url = `/api/wap/shop-manager/shop-manager-statistics`
    return request.get(url, {}, loading)
  },
  /**
   * 获取配送列表
   * @param data
   * @param loading
   * @returns {*}
   */
  deliveryList(loading = true) {
    const url = `/api/wap/shop-manager/store-delivery-list`
    return request.get(url, {}, loading)
  },
  /**
   * 获取售后管理申请列表
   * @param data
   * @param loading
   * @returns {*}
   */
  afterManagement(data, loading = true) {
    const url = `/api/wap/order-details`
    return request.get(url, data, loading)
  },
  /**
   * 获取售后管理申请列表
   * @param data
   * @param loading
   * @returns {*}
   */
  applicationRecordList(data, loading = true) {
    const url = `/api/wap/after-sale-orders`
    return request.get(url, data, loading)
  },
  /**
   * 获取销售订单
   * @param data
   * @param loading
   * @returns {*}
   */
  consumerOrder(data, loading = true) {
    const url = `/api/wap/shop-order`
    return request.get(url, data, loading)
  },
  /**
   * 取消申请售后
   * @param data
   * @param loading
   * @returns {*}
   */
  cancelApply(data, loading = true) {
    const url = `/api/wap/cancel-apply`
    return request.post(url, data, loading)
  },
  /**
   * 提交申请售后
   * @param data
   * @param loading
   * @returns {*}
   */
  applyAfterSale(data, loading = true) {
    const url = `/api/wap/apply-after-sale`
    return request.post(url, data, loading)
  },
  /**
   * 提交申请售后
   * @param data
   * @param loading
   * @returns {*}
   */
  groupOrder(id, loading = true) {
    const url = `/api/wap/order/${id}`
    return request.get(url, {}, loading)
  },
  /**
   * 确定提货
   * @param data
   * @param loading
   * @returns {*}
   */
  delivery(data, loading = false) {
    const url = `/api/wap/delivery`
    return request.post(url, data, loading)
  },
  /**
   * 客户的订单列表
   * @param data
   * @param loading
   * @returns {*}
   */
  deliveryOrder(data, loading = false) {
    const url = `/api/wap/delivery-orders`
    return request.get(url, data, loading)
  },
  /**
   * 配送单确认收货
   * @param data
   * @param loading
   * @returns {*}
   */
  deliveryConfirm(id, loading = false) {
    const url = `/api/wap/shop-manager/store-delivery-confirm/${id}`
    return request.put(url, {}, loading)
  },
  /**
   * 提醒收货
   * @param data
   * @param loading
   * @returns {*}
   */
  remindDelivery(data, loading = false) {
    const url = `/api/wap/remind-delivery`
    return request.post(url, data, loading)
  },
  /**
   * 获取预售清单
   * @param data
   * @param loading
   * @returns {*}
   */
  getPresellGoods(data, loading = false) {
    const url = '/api/wap/goods/presell-goods'
    return request.get(url, data, loading)
  },
  /**
   * 店铺商品小程序卡片
   * @param data
   * @param loading
   * @returns {*}
   */
  goodsThumb(data, loading = false) {
    const url = '/api/wap/goods/shop-shelf-goods-thumb'
    return request.get(url, data, loading)
  },
  // 获取招募团长 开启关闭的 实时情况
  getLeaderStatus(data, loading = false) {
    const url = `/api/wap/recruit/shop-distribution-config`
    return request.get(url, data, loading)
  },
  inviteSubmit(data, loading = false) {
    const url = `/api/wap/recruit/shop-distribution-apply`
    return request.post(url, data, loading)
  },
  getDistributionCommissionList(data = { page: 1, limit: 10 }, loading = false, toast = false) {
    const url = `/api/wap/recruit/shop-distribution-list`
    return request.get({url, data, loading, toast})
  },
  /**
   * 团长招募团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  getLeaderDetail(data = {}, loading = false) {
    const url = `api/wap/get-shop-detail`
    return request.get(url, data, loading)
  },
  setCodeMessage(data, loading) {
    const url = `/api/wap/recruit/message-bind`
    return request.post(url, data, loading)
  }
}
