<template>
  <div class="wrap">
    <navigation-bar title="订单详情"></navigation-bar>
    <div class="order-banner">
      <div class="backdrop"><img v-if="imageUrl && corpName === 'retuan'" :src="imageUrl+'/yx-image/retuan/bg-ddxq@2x.png'" alt="" class="backdrop-img"></div>
      <div class="backdrop"><img v-if="imageUrl && corpName === 'platform'" :src="imageUrl+'/yx-image/cart/bg-ddxq@2x.png'" alt="" class="backdrop-img"></div>
      <div class="content">
        <div class="status">
          <div class="icon">
            <img v-if="imageUrl && corpName === 'retuan'" class="icon-img" :src="imageUrl+'/yx-image/retuan/icon_refund_xq@2x.png'" alt="">
            <img v-if="imageUrl && corpName === 'platform'" class="icon-img" :src="imageUrl+'/yx-image/cart/icon_refund_xq@2x.png'" alt="">
          </div>
          <div class="statu-txt">{{saleText}}</div>
        </div>
      </div>
    </div>
    <div class="address-info">
      <div class="top">
        <div class="warp">
          <div class="design" :class="'corp-' + corpName + '-bg'">团长</div>
          <div class="icon-number"><span class="name">{{orderMsg.shop_name}}</span><span
            class="text">{{orderMsg.social_name}}</span></div>
        </div>
        <div class="address-text">提货地址：{{orderMsg.shop_address}}</div>
      </div>
    </div>
    <div class="gary-box"></div>
    <div class="order-list">
      <div class="order-item">
        <div class="goods-item">
          <div class="goods-info-box">
            <img class="goods-img" mode="aspectFill" :src="orderMsg.image_url" alt="">
            <div class="goods-info">
              <div class="tit">
                <div class="name">{{orderMsg.goods_name}}</div>
                <div class="quantity">x<span class="num">{{orderMsg.num}}</span></div>
              </div>
              <div class="guige">规格：{{orderMsg.goods_units}}</div>
              <div class="price">
                <div class="amout"><span class="num">{{orderMsg.price}}</span>元</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="oinfo">
      <div class="o-item">退款金额：<span class="price" :class="'corp-' + corpName + '-money'"><span class="num" :class="'corp-' + corpName + '-money'">{{orderMsg.total}}</span>元</span></div>
      <div class="o-item">退款方式：{{orderMsg.refund_method}}</div>
      <div class="order-iden">
        <div class="txt">订单编号：{{orderMsg.order_sn}}</div>
        <div class="copy-btn" @click.stop="clipOrderId">复制</div>
      </div>
      <div class="order-time">申请时间：{{orderMsg.created_at}}</div>
    </div>
    <div class="service" @click.stop="showGroupList">
      <img v-if="imageUrl" :src="imageUrl + '/yx-image/goods/icon-service@2x.png'" mode="widthFix" class="service-img">
      <div class="service-btn">联系团长</div>
    </div>
    <link-group ref="groupList" :wechatInfo="groupInfo"></link-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import LinkGroup from '@components/link-group/link-group'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import API from '@api'

  export default {
    data() {
      return {
        orderId: '',
        orderMsg: {},
        groupInfo: {},
        saleText: ''
      }
    },
    onLoad(e) {
      this.orderId = e.id
    },
    onShow() {
      this.getAfterGoodsDetailData()
    },
    methods: {
      showGroupList() {
        this.$refs.groupList.showLink()
      },
      clipOrderId() {
        let that = this
        that.$wx.setClipboardData({
          data: this.orderMsg.order_sn,
          success: function(res) {
            that.$wx.getClipboardData({
              success: function(res) {}
            })
          }
        })
      },
      getAfterGoodsDetailData() {
        API.Order.reqSaleOrderDetail(this.orderId).then((res) => {
          if (res.error === this.$ERR_OK) {
            this.orderMsg = res.data
            switch (res.data.after_sale_status * 1) {
              case 0 :
                this.saleText = '审核中'
                break
              case 1 :
                this.saleText = '退款成功'
                break
              case 2 :
                this.saleText = '退款失败'
                break
              case 3 :
                this.saleText = '取消退款'
                break
            }
            this.groupInfo = {
              wx_account: res.data.wx_account,
              mobile: res.data.shop_mobile
            }
          } else {
            this.$wechat.showToast(res.message)
          }
        })
      }
    },
    components: {
      NavigationBar,
      LinkGroup
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~@designCommon"
  .wrap
    width: 100vw
    background: $color-background
    min-height: 100vh
    .order-banner
      width: 100vw
      height: 70px
      box-sizing: border-box
      layout(row)
      justify-content: space-between
      align-items: center
      margin: 0
      position: relative
      background-image: radial-gradient(95% -74%, #73C200 0%, #ABE300 100%)
      .backdrop
        position: absolute
        left: 0
        top: 0
        width: 100vw
        height: 70px
        z-index:2
        .backdrop-img
          width: 100%
          height: 100%
      .content
        position: absolute
        left: 0
        top: 0
        padding: 0 3.2vw
        width: 100vw
        height: 70px
        z-index: 9
        box-sizing: border-box
        layout(row)
        justify-content: space-between
        align-items: center
        .status
          layout(row)
          align-items: center
          .statu-txt
            font-family: $font-family-medium
            font-size: $font-size-18
            color: $color-white
          .icon
            width: 31px
            height: 31px
          .icon-img
            width: 100%
            display: block
            height: 100%
        .extract
          font-family: $font-family-medium
          font-size: $font-size-16
          color: $color-white
  .address-info
    padding-left: 3.2vw
    background: $color-white
    .bot
      font-family: $font-family-regular
      font-size: $font-size-15
      color: #000000
      height: 50px
      line-height: 50px
      border-top-1px($color-line)
    .top
      box-sizing: border-box
      padding:3.2vw 0
    .address-text
      font-family: $font-family-regular
      font-size: $font-size-15
      color: #000000
      line-height: 1.3
      word-break:break-all
      padding-right: 3.2vw
    .warp
      layout(row)
      align-items: center
      color: $color-text-sub
      padding-bottom: 10px
      .design
        font-size: $font-size-12
        color: $color-white
        text-align: center
        font-family: $font-family-regular
        width: 30px
        position: relative
        padding: 2px 0
        box-sizing: border-box
        margin-right: 10px
        border-radius: 2px
      .icon-number
        line-height: 25px
        .name
          font-size: $font-size-15
          color: $color-text-main
          font-family: $font-family-medium
          margin-right: 10px
        .text
          font-family: $font-family-regular
          font-size: $font-size-15
          color: $color-text-sub
  .goods-item
    height: 105px
    width: 100vw
    box-sizing: border-box
    padding: 0 3.2vw
    position: relative
    layout(row)
    justify-content: space-between
    align-items: center
    border-bottom-1px($color-line)
    .goods-info-box
      layout(row)
      flex: 1
      align-items: center
    .goods-img
      width: 75px
      border-radius: 2px
      height: 75px
    .arrlow
      width: 5.5px
      height: 10.5px
      .arr
        width: 100%
        height: 100%
        display: block
    .goods-info
      box-sizing: border-box
      padding-left: 2.67vw
      flex: 1
      .tit
        layout(row)
        align-items: center
        height: 16px
        justify-content: space-between
        .name
          width: 61.2vw
          font-family: $font-family-medium
          font-size: $font-size-14
          color: $color-sub
          min-height: 16px
          letter-spacing: 0.3px
          no-wrap()
        .quantity
          font-family: $font-family-regular
          font-size: $font-size-12
          color: #1F1F1F
          .num
            font-family: $font-family-regular
            font-size: $font-size-16
            color: $color-sub
      .share-tit
        .name
          width: 47.7vw
        .share-tit-btn
          font-size: $font-size-14
          color: $color-main
          border-1px($color-main, 11.5px)
          font-family: $font-family-regular
          height: 22px
          line-height: 22px
          width: 75px
          text-align: center
      .guige
        font-family: $font-family-regular
        font-size: $font-size-14
        color: $color-text-sub
        margin-top: 7px
        margin-bottom: 20px
      .price
        layout(row)
        align-items: center
        justify-content: space-between
        .refund
          width: 65px
          height: 25px
          line-height: 25px
          font-family: $font-family-regular
          font-size: $font-size-12
          color: #000000
          text-align: center
          background: $color-white
          border-1px($color-text-assist, 15px)
        .refund-text
          height: 25px
          line-height: 25px
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-money
        .amout
          font-family: $font-family-regular
          font-size: $font-size-11
          color: #1F1F1F
          .num
            font-family: $font-family-regular
            color: $color-sub
            font-size: $font-size-16
        .quantity
          font-family: $font-family-regular
          font-size: $font-size-12
          color: #1F1F1F
          .num
            font-family: $font-family-regular
            font-size: $font-size-16
            color: $color-sub
  .order-list
    background: $color-white
  .oinfo
    box-sizing: border-box
    min-height: 80px
    background: $color-white
    padding: 16px 3.2vw
    .o-item
      padding-bottom: 16px
      font-family: $font-family-regular
      font-size: $font-size-14
      color: #000000
      line-height: 14px
      .price
        font-family: $font-family-medium
        font-size: $font-size-14
        .num
          font-family: $font-family-medium
          font-size: $font-size-16
    .order-iden
      layout(row)
      align-items: center
      .txt
        font-family: $font-family-regular
        font-size: $font-size-14
        color: #000000
        line-height: 14px
      .copy-btn
        width: 54px
        margin-left: 15px
        height: 20px
        border-1px(#b7b7b7, 10px)
        text-align: center
        line-height: 20px
        box-sizing: border-box
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-text-main
        letter-spacing: 0.3px
    .order-time
      padding-top: 16px
      font-family: $font-family-regular
      font-size: $font-size-14
      color: #000000
      line-height: 14px
  .order-fixed
    z-index: 99
    layout(row)
    align-items: center
    background: #fff
    border-top-1px(#E6E6E6)
    position: fixed
    left: 0
    bottom: 0
    height: 50px
    right :0
    justify-content: space-between
    padding: 0 3.2vw
    .order-bottom-left
      font-size: $font-size-14
      color: #000
      font-family: $font-family-regular
      layout(row)
      align-items: center
      .color-time
        color: #ff8300
        width: 42px
        text-align: center
    .order-bottom-right
      layout(row)
      align-items: center
      .refund
        width: 77px
        height: 28px
        line-height: 28px
        font-family: $font-family-regular
        font-size: $font-size-14
        text-align: center
        color: $color-white
        background: $color-main
        border: 0.5px solid $color-main
        border-radius: 15px
        margin-left: 10px
      .close
        width: 77px
        height: 28px
        line-height: 28px
        font-family: $font-family-regular
        font-size: $font-size-14
        text-align: center
        color: $color-text-main
        background: $color-white
        border: 0.5px solid $color-text-assist
        box-sizing: border-box

  .service
    width: 100%
    margin-top: 15px
    height: 50px
    layout(row)
    justify-content: center
    align-items: center
    background: $color-white
    .service-btn
      font-family: $font-family-regular
      font-size: $font-size-15
      color: #000000
    .service-img
      width: 17.5px
      height: 15px
      display: block
      margin-right: 6px
  .gary-box
    width: 100vw
    height: 10px
    background: $color-background
</style>
