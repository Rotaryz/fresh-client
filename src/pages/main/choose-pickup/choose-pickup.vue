<template>
  <div class="choose-pickup">
    <navigation-bar
      ref="navigationBar"
      title="选择提货点"
      :headStyle="headStyle"
      :titleColor="titleColor"
      :showArrow="true"
      :arrowUrl="arrowUrl"
    ></navigation-bar>
    <section class="top-background">
      <div class="top-empty" :style="{height: backgroundTop+'px'}"></div>
      <img class="img" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/yx-image/2.3/bg-xzthd.png'" @load="handleLoad">
    </section>
    <div v-if="backgroundLoad" class="container">
      <div style="height: 41px"></div>
      <section v-if="groupInfo.id" class="header panel">
        <figure class="avatar">
          <img class="avatar-img" mode="aspectFill" v-if="groupInfo.head_image_url" :src="groupInfo.head_image_url">
          <img class="avatar-img" mode="aspectFill" v-else-if="imageUrl" :src="imageUrl + '/yx-image/2.1/default_avatar@2x.png'">
        </figure>
        <h1 class="name">团长 {{groupInfo.name}}</h1>
        <p class="position">当前提货点：{{groupInfo.social_name}}</p>
      </section>
      <dl v-if="historyList.length>0" class="panel list-wrapper">
        <dt class="title">历史提货点</dt>
        <div v-if="historyList.length>0" class="list-con">
          <dd v-for="(item, index) in historyList" :key="index" class="list-item-wrapper has-line" @click="handleCheck(item)">
            <pick-up :dataInfo="item"></pick-up>
          </dd>
        </div>
        <div v-if="dataArray.length>2" class="show-more" @click="showMoreHistory">
          <span v-if="showMore">收起</span>
          <span v-else>查看更多</span>
          <img :class="showMore?'show':''" class="more-img" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/yx-image/2.3/icon-pressed_down@2x.png'">
        </div>
        <div v-if="dataIsEmpty">
          <dd class="empty-wrapper">
            <img class="empty-img" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/yx-image/2.3/pic-address@2x.png'">
            <p>暂无历史提货点</p>
          </dd>
        </div>
      </dl>
      <dl class="panel list-wrapper">
        <dt class="title">附近提货点</dt>
        <div v-if="nearbyList.length>0" class="list-con">
          <dd v-for="(item, index) in nearbyList" :key="index" class="list-item-wrapper" :class="{'has-line': index < nearbyList.length}" @click="handleCheck(item)">
            <pick-up :dataInfo="item"></pick-up>
          </dd>
        </div>
        <div v-if="nearbyIsEmpty">
          <dd class="empty-wrapper">
            <img class="empty-img" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/yx-image/2.3/pic-address@2x.png'">
            <p>暂无附近提货点</p>
          </dd>
        </div>
      </dl>
      <is-end v-if="!hasMore"></is-end>
    </div>
    <confirm-msg ref="msg" useType="double" @confirm="handleConfirm"></confirm-msg>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import PickUp from './pickup-item/pickup-item'
  import ConfirmMsg from '@components/confirm-msg/confirm-msg'
  import ClearWatch from '@mixins/clear-watch'
  import API from '@api'

  const PAGE_NAME = 'CHOOSE_PICKUP'
  const ARROW_URL = ['/yx-image/2.3/icon-return_white@2x.png', '/zd-image/1.2/icon-title_back@2x.png']

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      PickUp,
      ConfirmMsg,
      ClearWatch
    },
    data() {
      return {
        headStyle: `background:#73c200`,
        titleColor: `#ffffff`,
        systemInfo: {},
        backgroundTop: 0,
        groupInfo: {},
        page: 1,
        dataArray: [],
        historyList: [],
        dataIsEmpty: false,
        showMore: false,
        hasMore: true,
        currentItem: {},
        arrowUrl: ARROW_URL[0],
        backgroundLoad: true,
        nearbyParams: {longitude: 0, latitude: 0},
        nearbyList: [],
        nearbyIsEmpty: false
      }
    },
    async onLoad(options = {}) {
      this._options = options
      // this.groupInfo = getApp().globalData.$groupInfo
      this._groupInfo()
      this._getSystemInfo()
      this.backgroundTop = (this.systemInfo.statusBarHeight || 20) + 44
      this.$refs.navigationBar && this.$refs.navigationBar.setNavigationBarBackground(`background:#73c200;transition:none`)
      this.titleColor = `#ffffff`
      this.arrowUrl = ARROW_URL[0]
      await this._getLocation()
      this._getList(false)
    },
    onPageScroll(e) {
      this._changeNavigation(e)
    },
    onReady() {
      if (this._options.errorCode === 'freezeShop') return
      this.$$sendEvent()
    },
    methods: {
      // 获取团长的信息
      async _groupInfo(loading) {
        if (this._options.errorCode === 'freezeShop') return
        let res = await API.Choiceness.getGroupInfo(loading)
        if (loading) {
          this.$wechat.hideLoading()
        }
        if (res.error !== this.$ERR_OK) {
          this.$wechat.showToast(res.message)
          return
        }
        this.groupInfo = res.data || {}
      },
      handleLoad() {
        // wx.nextTick(() => {
        //   this.backgroundLoad = true
        // })
        // setTimeout(() => {
        //   this.backgroundLoad = true
        // }, 100)
      },
      // 获取设备系统参数
      _getSystemInfo() {
        this.systemInfo = wx.getSystemInfoSync()
      },
      _changeNavigation(e) {
        let flag = e.scrollTop < 20
        let styles = flag ? `background:#73c200;transition:none` : `background:#fff;transition:none`
        this.arrowUrl = ARROW_URL[flag ? 0 : 1]
        this.$refs.navigationBar && this.$refs.navigationBar.setNavigationBarBackground(styles)
        this.titleColor = flag ? `#ffffff` : `#000000`
        wx.setNavigationBarColor({
          frontColor: this.titleColor,
          backgroundColor: '#ffffff',
          animation: {
            duration: 0,
            timingFunc: 'easeIn'
          }
        })
      },
      // 获取地理位置
      async _getLocation() {
        try {
          let res = await this.$wechat.getLocation()
          this.nearbyParams = {
            longitude: res.longitude,
            latitude: res.latitude
          }
        } catch (e) {
          this.nearbyParams = {
            longitude: 0,
            latitude: 0
          }
        }
      },
      _getList(loading) {
        API.Pickup.getNearbyList(this.nearbyParams, loading).then(res => {
          if (res.data && res.data.length) {
            this.nearbyList = res.data
            this.nearbyList.forEach((item) => {
              if (item.distance >= 1000) {
                item.distanceText = (item.distance / 1000).toFixed(1) + 'km'
              } else {
                item.distanceText = item.distance + 'm'
              }
            })
          } else {
            this.nearbyIsEmpty = true
          }
        })
        if (this._options.errorCode === 'freezeShop') return
        API.Pickup.getList({page: 1, limit: 2}, loading).then(res => {
          if (res.data && res.data.length) {
            this.dataArray = res.data
            if (res.data && res.data.length > 2) {
              this.historyList = [this.dataArray[0], this.dataArray[1]]
            } else {
              this.historyList = res.data
            }
          } else {
            this.dataIsEmpty = true
          }
        })
      },
      showMoreHistory() {
        this.showMore = !this.showMore
        if (this.showMore) {
          this.historyList = this.dataArray
        } else {
          this.historyList = [this.dataArray[0], this.dataArray[1]]
        }
      },
      handleCheck(item) {
        this.currentItem = item
        this.$refs.msg.show(`你确定将${item.social_name}设为新的提货点吗？`)
      },
      handleConfirm() {
        wx.setStorageSync('shopId', this.currentItem.id)
        wx.switchTab({url: this.$routes.main.CHOICENESS})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@designCommon"

  .panel
    background: #FFFFFF;
    box-shadow: 0 4px 30px 0 rgba(17,17,17,0.05);
    border-radius: 6px;
    position :relative

  .choose-pickup
    width: 100%
    min-height :100vh
    layout(column,block,nowrap)
    background :#f5f5f5
  .top-background
    position :absolute
    left :0
    right :0
    top:0
    width :100vw
    min-height :163px
    .top-empty
      width :100vw
      background:#73c200
    .img
      width :100vw
      min-height :99px
      display :block
  .container
    /*min-height :100vh*/
    layout(column,block,nowrap)
  .header
    margin :0 12px 12px 12px
    padding :0 10px
    position :relative
    text-align :center
    .avatar
      row-center()
      top:-16px
      box-sizing :border-box
      width :60px
      height :@width
      border-radius :50%
      border: 2px solid #FFFFFF
      overflow :hidden
      .avatar-img
        width :100%
        height :@width
        display :block
    .name
      padding-top :58px
      font-family: $font-family-medium
      font-size: 17px;
      color: #1D2023;
      line-height: 1
    .position
      padding-top :20px
      padding-bottom :26px
      font-family: $font-family-regular
      font-size: 15px;
      color: #3F454B;
      line-height: 1.4
  .empty-wrapper
    flex: 1
    padding-bottom: 30px
    position :relative
    font-family: PingFangSC-Regular
    font-size: 13px
    color: $color-text-sub
    text-align: center
    .empty-img
      margin :20px auto 10px
      width :77px
      height :72px
      display :block
  .list-wrapper
    margin :0 12px 12px
    padding :0 10px
    position :relative
    font-family: $font-family-regular
    font-size: 14px
    color: $color-text-main
    line-height: 1
    min-height: 225px
    transition: all 0.25s
    .title
      padding :16px 0 15px
      border-bottom-1px()
    .list-con
      min-height: 180px
      transition: all 0.25s
    .list-item-wrapper
      height :90px
      &.has-line
        border-bottom-1px()
      &:last-child
        border-none()
    .show-more
      width: 100%
      height: 45px
      line-height: 45px
      layout(row)
      justify-content: center
      align-items: center
      text-align: center
      font-size: $font-size-14
      font-family: $font-family-regular
      color: #9B9B9B
      border-top-1px()
      .more-img
        margin-left: 5px
        width: 12px
        height: 6px
        display: block
        transition: all 0.25s
        &.show
          transform:rotate(180deg)
</style>
