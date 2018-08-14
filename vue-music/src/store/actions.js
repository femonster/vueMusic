// 异步操作，封装mutation
import * as types from './mutation-types'

// Action 函数接受一个与store实例具有相同方法和属性的context对象。
// 可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
// 下面是用了“参数解构”的方式来简化代码
export const selectPlay = function({ commit, state }, { list, index }) {
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}