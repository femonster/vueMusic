// 管理状态
import { playMode } from 'common/js/config'
// 如果你的数据需要是全局的，并且许多组件需要与其交互时，可以使用vuex
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [], // 播放列表
    sequenceList: [], //顺序列表 （与播放模式有关）
    mode: playMode.sequence, // 播放模式
    currentIndex: -1 // 当前播放的索引
}

export default state
