<template>
    <scroll @scroll="scroll"
            :data="ldata"
            class="listview"
            ref="listview"
            :probe-type="probeType"
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
    </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'

// 导航字母的高度
const ANCHOR_HEIGHT = 18

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
            currentIndex:0,
            scrollY:-1,
            diff:-1
        }
    },
    created(){
        // 若放在data中的会被vue添加一个监听（getter,setter）
        this.probeType = 3
        this.touch = {}
        console.log("singers",this.ldata);
    },
    computed:{
        shortcutList(){
            return this.ldata.map((item)=>{
                return item.title.substr(0,1)
            })
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
        _scrollTo(index){
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
            
        },
        scroll(pos){
            this.scrollY = pos.y
        }
    },
    components:{
        Scroll
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
</style>

