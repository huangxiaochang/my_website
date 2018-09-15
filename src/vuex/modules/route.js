
const state = {
	async_role_list: [],
	menu_list: []
}

const mutations = {
	SETMENULIST (state, data) {
		state.menu_list = data
	},

	GENERATEUSERROUTE (state, data) {
		state.async_role_list = data
	}
}

export default {
	state,
	mutations
}