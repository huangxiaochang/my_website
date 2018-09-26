
const state = {
	async_role_list: [],
	menu_list: []
}

const generate_menus =  (routes) => {
	let menus = []
	routes.forEach(item => {
		menus.push(generate_child_menus(item))
	})
	return menus
}

const generate_child_menus = (item) => {
	let menu = {}
	menu.name = item.name
	menu.path = item.path
	menu.title = item.meta && item.meta.title ? item.meta.title : ''
	menu.icon = item.meta && item.meta.icon ? item.meta.icon : ''
	menu.isShow = item.meta && item.meta.isShow ? item.meta.isShow : false
	if (item.children && item.children.length !== 0) {
		menu.children = generate_menus(item.children)
	} else {
		menu.children = []
	}
	return menu
}

const mutations = {
	SETMENULIST (state, data) {
		state.menu_list = generate_menus(data)
	},

	GENERATEUSERROUTE (state, data) {
		state.async_role_list = data
	}
}

export default {
	state,
	mutations
}