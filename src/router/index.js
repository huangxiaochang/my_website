import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex'
import { constantRouteMap, asyncRouteMap} from './routes.js'
import { cookie_mange } from '@/utils/index.js'

Vue.use(Router)

const router =  new Router({
	mode: 'history',
	base: 'device_statistic_index',
  	routes: [
  	  ...constantRouteMap
  	]
})

function isNeedToLogin (to) {
	const routes = constantRouteMap.concat(asyncRouteMap)
	let flag = false
	routes.some((item) => {
		if (to.path === item.path) {
			flag = item.meta.auth
			return true
		}
	})
	return flag
}

// 在登录的情况下，如果已经生成过动态路由，直接next(),否者先生成动态路由再next(), 如果没有权限， next(/403)
// 在还没有登录的情况下， 判断该路由页面是否需要登录， 如果不需要，直接next(), 否者跳转到登录页面
router.beforeEach((to,from, next) => {
	// 注意，判断的顺序不能改变
	if (to.meta.auth === false) {
		// 不需要登陆
		next()
	} else if (cookie_mange.get_cookie('user_cookie')) {
		// 还没有生成动态路由
		if (store.getters.get_async_routes.length === 0) {
			store.dispatch('generate_sync_routes', cookie_mange.get_cookie('user_role').split(','))
			router.addRoutes(store.getters.get_async_routes)
			// 这里要用next(to.path),不能用next(),如果没有加to.path,手动刷新的时候，页面会比变空，
			// 这次因为第一次to进来的时候，还没有相应的route,(也就是还没有加载到组件)
			next({...to, replace: true})
			// next()
		} else {
			next()
		}
	} else {
		// 需要登录但是还有登录
		next('/login')
	}
})
export default router
