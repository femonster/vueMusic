<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
    data(){
        return {
            songs:[]
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ]),
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        }
    },
    created(){
        this._getDetail()
    },
    components:{
        MusicList
    },
    methods:{
        _getDetail(){
            if(!this.singer.id){
                this.$router.push('/singer')
                return 
            }
            getSingerDetail(this.singer.id).then((res)=>{
                if(res.code === ERR_OK){
                    this.songs = this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach(element => {
                // 结构赋值
                let {musicData} = element
                if(musicData.songid && musicData.albummid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>
<style lang="stylus" scoped>
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>


