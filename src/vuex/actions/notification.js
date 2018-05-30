export default {
	show_notification: ({ commit }, data) => {
		console.log(777)
		commit('SHOW_NOTIFICATION', data)
	},
	close_notification: ({ commit }, data) => {
		commit('CLOSE_NOTIFICATION', data)
	}
}
