import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/index.js'
import getters from './getters/index.js'
import modules from './modules/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	modules
})