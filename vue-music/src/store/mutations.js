import * as types from './mutation-types'

// 所有的mutations,通过commit mutations 来改变state
const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer
    }
}

export default mutations