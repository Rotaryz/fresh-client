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
    const url = `/social-shopping/api/wap/shop-manager-login`
    return request.post(url, data, loading)
  },
  /**
   * 获取二维码
   * @param data
   * @param loading
   * @returns {*}
   */
  messageBind(data, loading) {
    const url = `/social-shopping/api/wap/message-bind`
    return request.post(url, data, loading)
  },
  /**
   * 团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  leaderDetail(loading = false) {
    const url = `/social-shopping/api/wap/shop-manager/shop-manager-detail`
    return request.get(url, {}, loading)
  },
  /**
   * 团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  saveLeader(data, loading = true) {
    const url = `/social-shopping/api/wap/shop-manager/shop-manager-update`
    return request.post(url, data, loading)
  },
  /**
   * 团长详情
   * @param data
   * @param loading
   * @returns {*}
   */
  recommendGoods(loading = false) {
    const url = `/social-shopping/api/wap/goods/shop-shelf-hot-goods`
    return request.get(url, {}, loading)
  },
  /**
   * 获取团长统计信息
   * @param data
   * @param loading
   * @returns {*}
   */
  leaderOrderTotal(loading = false) {
    const url = `/social-shopping/api/wap/shop-manager/shop-manager-statistics`
    return request.get(url, {}, loading)
  },
  /**
   * 获取配送列表
   * @param data
   * @param loading
   * @returns {*}
   */
  deliveryList(loading = true) {
    const url = `/social-shopping/api/wap/shop-manager/store-delivery-list`
    return request.get(url, {}, loading)
  },
  /**
   * 获取售后管理申请列表
   * @param data
   * @param loading
   * @returns {*}
   */
  afterManagement(data, loading = true) {
    const url = `/social-shopping/api/wap/order-details`
    return request.get(url, data, loading)
  },
  /**
   * 获取售后管理申请列表
   * @param data
   * @param loading
   * @returns {*}
   */
  applicationRecordList(data, loading = true) {
    const url = `/social-shopping/api/wap/after-sale-orders`
    return request.get(url, data, loading)
  },
  /**
   * 获取销售订单
   * @param data
   * @param loading
   * @returns {*}
   */
  consumerOrder(data, loading = true) {
    const url = `/social-shopping/api/wap/shop-order`
    return request.get(url, data, loading)
  },
  /**
   * 取消申请售后
   * @param data
   * @param loading
   * @returns {*}
   */
  cancelApply(data, loading = true) {
    const url = `/social-shopping/api/wap/cancel-apply`
    return request.post(url, data, loading)
  },
  /**
   * 提交申请售后
   * @param data
   * @param loading
   * @returns {*}
   */
  applyAfterSale(data, loading = true) {
    const url = `/social-shopping/api/wap/apply-after-sale`
    return request.post(url, data, loading)
  },
  /**
   * 提交申请售后
   * @param data
   * @param loading
   * @returns {*}
   */
  groupOrder(id, loading = true) {
    const url = `social-shopping/api/wap/order/${id}`
    return request.get(url, {}, loading)
  }
}
