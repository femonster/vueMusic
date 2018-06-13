<template>
    <scroll @scroll="scroll"
            :data="ldata"
            class="listview"
            ref="listview"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            >
        <ul>
            <li v-for="(group,index) in ldata" class="list-group" ref="listGroup" :key="index">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="(item,index) in group.items" class="list-group-item" :key="index">
                        <img v-lazy="item.avatar" alt="avatar" class="avatar"/>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li v-for="(item,index) in shortcutList" 
                    :data-index="index" 
                    class="item" 
                    :key="index"
                    :class="{'current':currentIndex===index}"
                    @touchstart.stop.prevent = "onShortcutTouchstart"
                    @touchmove.stop.prevent = "onShortcutTouchmove"
                    >{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>
        <div v-show="!ldata.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
// 导航字母的高度
const ANCHOR_HEIGHT = 18

// 字母标题的高度
const TITLE_HEIGHT = 30
export default {
    props:{
        ldata:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data(){
        return {
            // 当前区域
            currentIndex:0,
            // 滚动的Y值
            scrollY:-1,
            diff:-1,
        }
    },
    created(){
        // 若放在data中的会被vue添加一个监听（getter,setter）
        this.probeType = 3
        this.listenScroll = true
        this.touch = {}
        this.listHeight = []
    },
    computed:{
        shortcutList(){
            return this.ldata.map((item)=>{
                return item.title.substr(0,1)
            })
        },
        // 固定导航
        fixedTitle(){
            if(this.scrollY>0){
                return ''
            }
            return this.ldata[this.currentIndex]?this.ldata[this.currentIndex].title:''
        }
    },
    methods:{
        onShortcutTouchstart(e){
            let anchorIndex = e.target.dataset.index
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchmove(e){
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT | 0
             let anchorIndex = parseInt(this.touch.anchorIndex) + delta 
             this._scrollTo(anchorIndex)
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        _calculateHeight(){
        // 每个listGroup的高度（其实不是高度，应该叫to top height 合适点） 
          this.listHeight=[]
          const list = this.$refs.listGroup
          let height = 0
          this.listHeight.push(height)
          for(let i = 0;i<list.length;i++){
              let item = list[i]
              height += item.clientHeight
              this.listHeight.push(height)
          }
      },
        _scrollTo(index){
            // 不存在判断
            if(!index && index !== 0){
                return
            }
            // 边界值判断
            if(index<0){
                index = 0
            }else if(index>this.listHeight.length -1){
                index = this.listHeight.length - 1
            }

            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
        }
    },
    watch:{
        ldata(){
            setTimeout(()=>{
                this._calculateHeight()
            },20)
        },
        scrollY(newY){
            const listHeight = this.listHeight
             
            // 滚动到顶部 newY>0
            if(newY>0){
                this.currentIndex = 0
                
                return
            }
            // 在中间滚动
            for(let i = 0;i<listHeight.length-1;i++){
                let h1 = listHeight[i]
                let h2 = listHeight[i+1]
                if(-newY >= h1 && -newY < h2){
                    this.currentIndex = i
                    // 新值 - 下限 = 与title的差值
                    this.diff = h2 + newY
                    return
                }
            }

            // 当滚动到底部
            this.currentIndex = listHeight.length-1
           
            

        },
        diff(newVal){
            let fixedTop = (newVal>0 && newVal<TITLE_HEIGHT)?newVal - TITLE_HEIGHT : 0
            if(this.fixedTop === fixedTop){
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    components:{
        Scroll,
        Loading
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background-color $color-background
    .list-group
        padding-bottom 30px
        .list-group-title
            height 30px
            line-height 30px
            padding-left 20px
            font-size $font-size-small
            color: $color-text-l
            background: $color-highlight-background
        .list-group-item
            display flex
            align-items center
            padding 20px 0 0 30px
            .avatar
                width: 50px
                height: 50px
                border-radius: 50%
            .name
                margin-left: 20px
                color: $color-text-l
                font-size: $font-size-medium
    .list-shortcut
        position absolute
        z-index 30
        right 0
        top 50%
        transform translateY(-50%)
        width 20px
        padding 20px 0
        border-radius 10px
        text-align center
        background $color-background-d
        font-family Helvetica
        .item
            padding 3px
            line-height 1
            color $color-text-l
            font-size $font-size-small
            &.current
                color: $color-theme
    .list-fixed
        position absolute
        top 0
        left 0
        width 100%
        .fixed-title
            height 30px
            line-height 30px
            padding-left 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-highlight-background
    .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)

</style>

