import { constantRouteMap, asyncRouteMap} from '@/router/routes.js'
import { cookie_mange } from '@/utils/index.js'

function filterRoutes (routes, roles) {
	const operate_permission = cookie_mange.get_cookie('operate_permission').split(',')

	const arr = routes.filter((item) => {
		if (item.path === '*') {
			return true
		}
		if (item.children && item.children.length !== 0) {
			item.children = filterChildRoutes(item.children, roles, operate_permission)
		}
		let flag = false
		roles.some((r) => {
			if (item.meta.roles.includes(r)) {
				item.meta.operate_permission = operate_permission
				flag = true
				return true
			}
		})
		return flag
	})
	return arr
}

// 递归处理子路由
function filterChildRoutes (routes, roles, operate_permission) {
	const arr = routes.filter(item => {
		let flag = false
		if (item.children && item.children.length !== 0) {
			item.children = filterChildRoutes(item.children, roles, operate_permission)
		}
		roles.some((r) => {
			if (item.meta.roles.includes(r)) {
				item.meta.operate_permission = operate_permission
				flag = true
				return true
			}
		})
		return flag
	})
	return arr
}

export default {
	generate_sync_routes ({ commit }, roles) {
		let routes = filterRoutes(asyncRouteMap, roles)
		commit('GENERATEUSERROUTE', routes)
		commit('SETMENULIST', constantRouteMap.concat(routes))
	}
}