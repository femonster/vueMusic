<template>
  <div class="recommend">
    <!-- <div> -->
      <div v-if="recommends.length" class="slider-wrapper">
         <slider>
           <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="slider" class="needsclick">  
              </a>
           </div>
         </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
      </div>
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 知识点：1.jsonp,promise,Obiect.assign(),公共部分抽离
 *        2.better-scroll,ref,props, 生命周期
 *        3.keep-alive， 通过后端代理方式，获取歌单列表（dev-server.js,axios）
 *        4.flex布局，better-scroll
 */

import { getRecommend } from "api/recommend"
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'

export default{
  data(){
    return{
      recommends:[]
    }
  },
  created(){
    this._getRecommend()
  },
  methods:{
    _getRecommend(){
      getRecommend().then((res)=>{
          if(res.code === ERR_OK){
              this.recommends = res.data.slider
              console.log(this.recommends)
          }
      })
    }
  },
  components:{
    Slider
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.recommend
  position fixed
  width 100%
  top 88px
  left 0px
  .slider-wrapper
    position relative
    width 100%
    overflow hidden
  .recommend-list
    .list-title
      height 65px
      line-height 65px
      text-align center
      font-size $font-size-medium
      color $color-theme
</style>