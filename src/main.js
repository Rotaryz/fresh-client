// 只有生产环境才引入阿拉丁数据统计
import '../static/sdk/ald-stat'
import Vue from 'vue'
import store from '@state/store'
import App from './App'
import '@utils/env-clear'
import '@utils/app-plugins'
import '@utils/saas'
import '@design'

Vue.config._mpTrace = process.env !== 'production'
// Vue.config._mpTrace = true
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()

// export default {
//   // 这个字段走 app.json
//   config: {
//     // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
//     pages: ['^pages/choiceness'],
//     window: {
//       backgroundTextStyle: 'light',
//       navigationBarBackgroundColor: '#fff',
//       navigationBarTitleText: 'WeChat',
//       navigationBarTextStyle: 'black',
//       navigationStyle: 'custom' // 自定义导航栏
//     },
//     permission: {
//       'scope.userLocation': {
//         'desc': '当前位置用于定位你附近的自提点'
//       }
//     },
//     tabBar: {
//       color: '#2c2c2c',
//       selectedColor: '#73C200',
//       backgroundColor: '#ffffff',
//       borderStyle: 'black',
//       custom: true,
//       list: [
//         {
//           pagePath: 'pages/choiceness',
//           text: '首页',
//           iconPath: '/static/img/icon-select.png',
//           selectedIconPath: '/static/img/icon-select_press.png'
//         },
//         {
//           pagePath: 'pages/shopping-cart',
//           text: '购物车',
//           iconPath: '/static/img/icon-goodscart.png',
//           selectedIconPath: '/static/img/icon-goodscat_press.png'
//         },
//         {
//           pagePath: 'pages/mine',
//           text: '我的',
//           iconPath: '/static/img/icon-my.png',
//           selectedIconPath: '/static/img/icon-my_press.png'
//         }
//       ]
//     },
//     usingComponents: {},
//     plugins: {
//       goodsSharePlugin: {
//         version: '3.0.0',
//         provider: 'wx56c8f077de74b07c'
//       }
//     }
//   }
// }

export const _this = app
