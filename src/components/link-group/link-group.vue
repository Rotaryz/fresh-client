<template>
  <form action="" report-submit @submit="$getFormId">
  <div class="link-group" @click="test">
    <div class="link-box" v-show="linkShow" @touchmove.prevent="" @click.stop="hideLink"></div>
    <div class="link-bottom" :class="linkShow ? 'show' : ''">
      <div v-if="linkType === 1" class="link-tab link-tab-border" @click.stop="clipWechat">
        复制微信号：{{wechatInfo.wx_account}}
      </div>
      <div v-if="linkType === 1" class="link-tab" @click.stop="callPhone">呼叫：{{wechatInfo.mobile}}</div>
      <button open-type="share" v-if="linkType === 2" class="link-tab link-tab-border" @click.stop="hideLink">发送给朋友</button>
      <div v-if="linkType === 2 && isSharePoster" class="link-tab" @click.stop="saveImg">生成卡片保存分享</div>
      <div class="line"></div>
      <div class="link-tab" @click.stop="hideLink">取消</div>
    </div>
  </div>
  </form>
</template>

<script type="text/ecmascript-6">
  const CLIP_SUCCESS = 'setClipboardData:ok'
  const PHONE_SUCCESS = 'makePhoneCall:ok'

  const COMPONENT_NAME = 'LINK_GROUP'

  export default {
    name: COMPONENT_NAME,
    props: {
      wechatInfo: {
        type: Object,
        default: {}
      },
      linkType: {
        type: Number,
        default: 1
      },
      isSharePoster: {
        type: Boolean, // 是否展示生成海报
        default: true
      }
    },
    data() {
      return {
        linkShow: false
      }
    },
    onUnload() {
      this.linkShow = false
    },
    methods: {
      hideLink() {
        this.linkShow = false
      },
      showLink() {
        this.linkShow = true
      },
      clipWechat() {
        let wechat = this.wechatInfo.wx_account
        this.$wechat.setClipboardData(wechat)
          .then((res) => {
            if (res.errMsg !== CLIP_SUCCESS) {
              this.$wechat.showToast('复制失败')
              return
            }
            this.hideLink()
          })
      },
      callPhone() {
        let phone = this.wechatInfo.mobile
        this.$wechat.makePhoneCall(phone)
          .then((res) => {
            if (res.errMsg !== PHONE_SUCCESS) {
              this.$wechat.showToast('复制失败')
              return
            }
            this.hideLink()
          })
      },
      saveImg() {
        this.$emit('saveImg')
        this.hideLink()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~@designCommon"
  .link-box
    position: fixed
    left: 0
    top: 0
    bottom: 0
    right: 0
    z-index: 9999
    background: rgba(55, 75, 99, 0.8)
  .link-bottom
    position: fixed
    bottom: -130%
    left: 0
    background: #fff
    width: 100%
    z-index:99999999999999
    transition: all .5s
    .link-tab
      width: 100%
      height: 55px
      text-align: center
      line-height: 55px
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-text-main
    .link-tab-border
      border-bottom-1px(#E6E6E6)
    .line
      width: 100%
      height: 11px
      background: $color-background
  .show
    bottom: 0
</style>
