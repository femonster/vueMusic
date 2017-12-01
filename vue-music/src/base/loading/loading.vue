<template>
  <div class="loading">
    <div style="color: #dbbe39" class="la">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props:{
      title:{
          type:String,
          default:'正在载入...'
      }
  }
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .loading
        width 100%
        text-align center
        .la,
        .la>div
            position relative
            box-sizing border-box
        .la
            display block
            font-size 0
            color #ffffff
            width 40px
            height 32px
            margin 0 auto 10px
        .la>div
            display inline-block
            float none 
            background-color currentColor
            border 0 solid currentColor
            width 4px 
            height 32px
            margin 2px
            margin-top 0
            margin-bottom 0
            border-radius 0
            animation line-scale .9s infinite cubic-bezier(.85, .25, .37, .85)
            &:nth-child(3)
                animation-delay -.9s
            &:nth-child(2),
            &:nth-child(4)
                animation-delay -.7s
            &:nth-child(1),
            &:nth-child(5)
                animation-delay -.5s    
        .desc
            line-height 20px
            font-size $font-size-small
            color $color-text-l
    @keyframes line-scale
        0%
            transform scaleY(1)
        50%
            transform scaleY(.3)
        100%
            transform scaleY(1)

</style>


