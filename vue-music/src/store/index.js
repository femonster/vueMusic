import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 记录修改日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV!=='production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,//检测state修改是否来源于mutation. 在开发环境使用
    plugins:debug?[createLogger()]:[]
})