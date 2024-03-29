import Vue from 'vue'
import store from '@state/store'
import wx from 'wx'
// import WeIM from './we-im/index'
import {ERR_OK, baseURL} from './config'
import * as wechat from './wechat'
// import * as cos from './we-cos/upload'
// import {fileType} from './we-cos/fileConfig'
import baseCommon from '@mixins/base-common'
import base from '@mixins/base'
import createQrCode from '@utils/create-qr-code'
import routes from '@utils/routes'

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
    Vue.mixin(baseCommon)
    // if (!Vue.prototype.$webimHandler) {
    //   Vue.prototype.$webimHandler = new WeIM()
    // }
    Vue.prototype.$ERR_OK = ERR_OK
    Vue.prototype.$imageUrl = baseURL.image
    Vue.prototype.$outLink = baseURL.outLink
    Vue.prototype.$wechat = wechat
    Vue.prototype.$wx = wx
    // Vue.prototype.$cos = cos
    // Vue.prototype.$cosFileType = fileType
    Vue.prototype.$store = store
    Vue.prototype.$createQrCode = createQrCode
    Vue.prototype.$routes = routes
  }
}
// 使用插件
Vue.use(AppPlugin)
wx.onNetworkStatusChange(function (res) {
  // console.error(res.isConnected, typeof res.isConnected, '是否有网络连接')
  getApp().globalData.isConnected = res.isConnected
  if (!res.isConnected) {
    const options = wx.getLaunchOptionsSync()
    if (options.path === routes.main.ERROR) {
      return
    }
    wx.redirectTo({url: routes.main.ERROR})
  }
  console.error(res.networkType)
})
wx.onMemoryWarning(function (res) {
  console.warn('onMemoryWarningReceive', res)
})
// wx.showShareMenu({
//   withShareTicket: true
// })
