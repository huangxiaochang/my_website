const state = {
	options: {
		is_show: false,
		is_auto_close: true,
		auto_close_time: 2000,
		title: '提示',
		type: 'info',
		content: ''
	}
}

const mutations = {
	SHOW_NOTIFICATION(state, data) {
		for (let pro in data) {
			if (pro in state.options) {
				state.options[pro] = data[pro]
			}
		}
	},
	CLOSE_NOTIFICATION(state, data) {
		state.options.is_show = data
	}
}

export default {
	state,
	mutations
}
