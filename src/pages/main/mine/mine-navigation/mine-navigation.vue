<template>
  <div class="mine-navigation">
    <div class="panel">
      <p class="nav-title">我的服务</p>
      <div class="nav-box">
        <div class="nav-top">
          <div v-for="(item, index) in navList" :key="index" v-if="item.type === 'top' && item.isShow" class="item-wrapper" :class="item.cname" @click="handleClick(item)">
            <div class="img-box">
              <img class="icon-img" mode="aspectFill" v-if="imageUrl && item.icon" :src="imageUrl + item.icon">
              <p v-if="item.hasExplain === 1 && couponNumber > 0" class="item-count">{{couponNumber}}</p>
              <p v-if="item.hasExplain === 2 && goodsNumber" class="item-count">{{goodsNumber}}</p>
            </div>
            <p class="title">{{item.title}}</p>
          </div>
        </div>
        <div class="nav-bottom">
          <div v-for="(item, index) in navList" :key="index" v-if="item.type === 'bottom' && item.isShow" class="item-wrapper" :class="item.cname" @click="handleClick(item)">
            <div class="img-box">
              <img class="icon-img" mode="aspectFill" v-if="imageUrl && item.icon" :src="imageUrl + item.icon">
              <p v-if="item.hasExplain === 1 && couponNumber > 0" class="item-count">{{couponNumber}}</p>
              <p v-if="item.hasExplain === 2 && goodsNumber" class="item-count">{{goodsNumber}}</p>
            </div>
            <p class="title">{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="panel" :class="isLeader?'has-data':''">
      <ul class="nav-row">
        <li v-for="(item, index) in rowNavList" :key="index" class="item-wrapper" :class="item.cname" @click="handleClick(item)">
          <div class="row-con">
            <p v-if="item.leaderService" class="title">{{item.title}}</p>
            <p class="explain">查看全部</p>
            <img class="arrow-img" mode="aspectFill" v-if="imageUrl && !item.hideArrow" :src="imageUrl + '/yx-image/2.3/icon-pressed@2x.png'">
          </div>
          <div v-if="isLeader && orderTotal.today_income" class="row-con data-con">
            <div class="data-box">
              <p class="data-val">{{orderTotal.today_income}}</p>
              <p class="data-title">今日收入(元)</p>
            </div>
            <div class="data-box">
              <p class="data-val">{{orderTotal.today_order}}</p>
              <p class="data-title">今日订单(笔)</p>
            </div>
            <div class="data-box">
              <p class="data-val">{{orderTotal.today_sale}}</p>
              <p class="data-title">今日销售(元)</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'

  const COMPONENT_NAME = 'MINE_NAVIGATION'

  export default {
    name: COMPONENT_NAME,
    props: {
      detail: {
        type: Object,
        default: () => {
        }
      },
      couponNumber: {
        type: Number,
        default: 2
      },
      goodsNumber: {
        type: Number,
        default: 0
      },
      isLeader: {
        type: Boolean,
        default: false
      },
      isInvitation: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        navList: [
          {
            cname: '',
            icon: '/yx-image/2.4/icon-coupon_me@2x.png',
            title: '优惠券',
            hasExplain: 1,
            url: this.$routes.main.COUPON_MINE,
            fn: '_handleNav',
            type: 'top',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/invitation/icon-spcoupon_me@2x.png',
            title: '兑换券',
            hasExplain: 2,
            url: this.$routes.activity.COMMODITY_CERTIFICATES,
            fn: '_handleNav',
            type: 'top',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/invitation/icon-yqyl_me@2x.png',
            title: '邀请有礼',
            url: this.$routes.activity.INVITATION_INTRODUCTION,
            fn: '_handleNav',
            type: 'top',
            isShow: this.isInvitation
          },
          {
            cname: '',
            icon: '/yx-image/2.4/icon-mypt_me@2x.png',
            title: '我的拼团',
            url: this.$routes.main.MY_GROUP_BUY,
            fn: '_handleNav',
            type: 'top',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/2.4/icon-address_me@2x.png',
            title: '提货点',
            url: '',
            fn: '_navigateLocation',
            type: 'top',
            isShow: true
          },
          {
            // 收货地址
            cname: '',
            icon: '/yx-image/postage/icon-address_me@2x.png',
            title: '我的地址',
            url: this.$routes.postage.ADDRESS_MANAGE,
            fn: '_handleNav',
            type: 'top',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/2.4/icon-question_me@2x.png',
            title: '常见问题',
            url: 'out-html?routeType=FAQ',
            fn: '_handleNav',
            type: 'top',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/2.4/icon-colonel@2x.png',
            title: '团长招募',
            url: 'out-html?routeType=recruit-regimental',
            fn: '_handleNav',
            type: 'bottom',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/2.4/icon-supplier_me@2x.png',
            title: '供应商招募',
            url: 'out-html?routeType=recruit-supplier',
            fn: '_handleNav',
            type: 'bottom',
            isShow: true
          },
          {
            cname: '',
            icon: '/yx-image/2.4/icon-alliance_me@2x.png',
            title: '加盟商招募',
            url: 'out-html?routeType=recruit-alliance',
            fn: '_handleNav',
            type: 'bottom',
            isShow: true
          }
        ],
        rowNavList: [
          {
            icon: '/yx-image/2.4/icon-myxq_me@2x.png',
            title: '团长服务',
            leaderService: true,
            url: '',
            fn: '_handleNav',
            hasData: true
          }
        ],
        orderTotal: {}
      }
    },
    onLoad() {
      this.isLeader && this._leaderOrderTotal()
    },
    onShow() {
      this.isLeader = wx.getStorageSync('isLeader') || false
      this.isLeader && this._leaderOrderTotal()
    },
    watch: {
      isInvitation(value) {
        let index = this.navList.findIndex((item) => item.title === '邀请有礼')
        if (index === -1) return
        this.navList[index].isShow = value
      }
    },
    methods: {
      handleClick(item) {
        typeof this[item.fn] === 'function' && this[item.fn](item)
      },
      _handleNav(item) {
        if (item.leaderService) {
          this._goMyHosing()
        } else {
          wx.navigateTo({ url: `${item.url}` })
        }
      },
      // 跳转我的小区
      _goMyHosing() {
        this.isLeader = wx.getStorageSync('isLeader') || false
        let page = this.isLeader ? this.$routes.leader.REGIMENTAL_COMMANDER : this.$routes.leader.MINE_HOUSING
        wx.navigateTo({ url: page })
      },
      // 获取团长订单统计
      async _leaderOrderTotal() {
        let res = await API.Leader.leaderOrderTotal()
        if (res.error !== this.$ERR_OK) {
          return
        }
        this.isLeader = wx.getStorageSync('isLeader') || false
        this.orderTotal = res.data
      },
      _navigateLocation() {
        this.$wechat.openLocation({
          latitude: this.detail.latitude,
          longitude: this.detail.longitude,
          name: this.detail.socialName,
          address: this.detail.address
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@designCommon"
  $padding-left = 13px

  .mine-navigation
    padding: 12px
    .panel
      background: #FFFFFF;
      box-shadow: 0 4px 30px 0 rgba(17, 17, 17, 0.06);
      border-radius: 6px
      margin-bottom: 12px
      padding-bottom: 4px
      .nav-title
        padding: 10px $padding-left 4px $padding-left
        color: $color-text-main
        font-size: 16px
        font-family: $font-family-bold
      .nav-box
        padding: 0 10px
      .nav-bottom
        border-top-1px($color-line)
      .nav-top, .nav-bottom
        layout(row)
        .item-wrapper
          layout(column, block, nowrap)
          justify-content: center
          align-items: center
          text-align: center
          width: 25%
          height: 78px
          font-family: $font-family-regular
          font-size: 12px;
          color: $color-text-main
          &.line-box
            border-bottom-1px(#e6e6e6)
          .img-box
            position: relative
          .icon-img
            width: 19px
            height: @width
            margin-bottom: 6px
          .item-count
            position: absolute
            top: -6px
            right: -7px
            min-width: 16px
            text-align: center
            height: 16px
            line-height: 14px
            padding: 0 3px
            box-sizing: border-box
            font-family: $font-family-medium
            color: $color-white
            font-size: $font-size-10
            border: 1px solid $color-white
            background: #FF3B39
            border-radius: 50%
          .arrow-img
            display: block
            width: 7.5px
            height: 12.5px

      .nav-row
        .item-wrapper
          layout(column)
          padding: 16px 10px
          .row-con
            layout(row)
            align-items: center
            font-family: $font-family-regular
            font-size: 16px
            color: $color-text-main
            .title
              padding-left: 3px
              flex: 1
              font-family: $font-family-bold
            .explain
              color: $color-text-sub
              font-size: 12px
              padding-right: 5px
            .arrow-img
              display: block
              width: 7.5px
              height: 12.5px
              margin-right: 5px
      &.has-data
        .nav-row
          .item-wrapper
            padding: 10px
            .data-con
              margin-top: 10px
              layout(row)
              border-radius: 6px
              background #fafafa
              .data-box
                height: 83px
                layout(column, block, nowrap)
                flex: 1
                justify-content: center
                align-items: center
                text-align: center
                .data-val
                  color: $color-text-main
                  font-size: 18px
                  font-family: $font-family-bold
                  margin-bottom: 8px
                .data-title
                  color: $color-text-sub
                  font-size: 12px
</style>
