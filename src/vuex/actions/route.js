import { constantRouteMap, asyncRouteMap} from '@/router/routes.js'
import { cookie_mange } from '@/utils/index.js'

function filterRoutes (routes, roles) {
	const operate_permission = cookie_mange.get_cookie('operate_permission').split(',')

	const arr = routes.filter((item) => {
		if (item.path === '*') {
			return true
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


export default {
	generate_sync_routes ({ commit }, roles) {
		let routes = filterRoutes(asyncRouteMap, roles)
		commit('GENERATEUSERROUTE', routes)
		commit('SETMENULIST', constantRouteMap.concat(routes))
	}
}