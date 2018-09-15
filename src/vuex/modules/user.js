const state = {
	user_info: {}
}

const mutations = {
	SETUSERINFO (state, data) {
		state.user_info = data
	}
}

export default {
	state,
	mutations
}