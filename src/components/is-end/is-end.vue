<template>
  <div class="is-end">
    <div class="left lines"></div>
    <div class="center">{{text}}</div>
    <div class="bot lines"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'IS_END'

  export default {
    name: COMPONENT_NAME,
    props: {
      text: {
        type: String,
        default: '已经到底了'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@designCommon"

  .is-end
    layout(row)
    justify-content: center
    align-items: center
    height: 60px
    box-sizing: border-box
    padding-top: 25px
    padding-bottom: 20px
    .lines
      width: 10px
      height: 1px
      background: rgba(124, 132, 156, 0.20)
      margin: 0 5px
    .center
      font-family: $font-family-regular
      font-size: $font-size-14
      color: rgba(152, 152, 159, 0.30)
      text-align: justify
      line-height: 1
</style>
