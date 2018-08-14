<template>
    <div class="player" v-show="playlist.length>0">
        <div class="normal-player" v-show="fullScreen">
            <div class="background">
                <img width="100%" height="100%" :src="currentSong.image">
            </div>
            <div class="top">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <h1 class="title" v-html="currentSong.name"></h1>
                <h2 class="subtitle" v-html="currentSong.singer"></h2>
            </div>
        </div>
        <div class="mini-player" v-show="!fullScreen" @click="open">
            <div class="icon">
                <img :src="currentSong.image" width="40" height="40">
            </div>
            <div class="text">
                <h2 class="name" v-html="currentSong.name"></h2>
                <p class="desc" v-html="currentSong.singer"></p>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playlist',
            'currentSong',
        ])
    },
    methods:{
        back() {
            this.setFullScreen(false)
        },
        open() {
            this.setFullScreen(true)
        },
        ...mapMutations({
            setFullScreen:'SET_FULL_SCREEN',
            setPlaylist: 'SET_PLAYLIST'
        })
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.player
    .normal-player
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 150
        background $color-background
        .background
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            z-index -1
            opacity 0.6
            filter blur(20px)
        .top 
            position relative
            margin-bottom 25px
            .back
                position absolute
                top 0
                left 6px 
                z-index 50
                .icon-back
                    display: block
                    padding: 9px
                    font-size: $font-size-large-x
                    color: $color-theme
                    transform: rotate(-90deg)
            .title 
                width 70%
                margin 0 auto 
                line-height 40px
                text-align center
                no-wrap()
                font-size: $font-size-large
                color: $color-text
            .subtitle
                line-height: 20px
                text-align: center
                font-size: $font-size-medium
                color: $color-text
    .mini-player
        display flex
        align-items center
        position fixed
        left 0
        bottom 0
        z-index 180
        width 100%
        height 60px
        background $color-highlight-background
        .icon 
            flex 0 0 40px // flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
            width 40px
            padding 0 10px 0 20px
            img 
                border-radius 50%
                &.play 
                    animation rotate 10s linear infinite 
                &.pause
                    animation-play-state paused 
        .text 
            display flex 
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            .name
                margin-bottom: 2px
                no-wrap()
                font-size: $font-size-medium
                color: $color-text
            .desc
                no-wrap()
                font-size: $font-size-small
                color: $color-text-d
@keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>


