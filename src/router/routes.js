import Login from 'views/login/index.vue'
// lazying import component
const Home = resolve => require(['views/home/index.vue'], resolve)

/*
	path: the path of route
	name: the name of route
	compoent: the component rendered for route
	auth: whatever its need to logining
	isShow: default value is true, whatever its show in the menu,
	roles: this page permiission of route
	opertar_permission: the optertar permission of a page,
	icon: the icon of menu
	
*/

// the routes no need permission control
export const constantRouteMap = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			title: '登录',
			isShow: false,
			auth: false,
			icon: ''
		},
		children: []
	},
	{
		path: '/403',
		name: '403',
		component: resolve => require(['views/403.vue'], resolve),
		isShow: false,
		icon: '',
		meta: {
			title: '403',
			isShow: false,
			auth: false,
			icon: ''
		},
		children: []
	},
	{
		path: '/404',
		name: '404',
		component: resolve => require(['views/404.vue'], resolve),
		isShow: false,
		icon: '',
		meta: {
			title: '404',
			isShow: false,
			auth: false,
			icon: ''
		},
		children: []
	}
]

// dynamic loading routes, added to in route.beforeEach
export const asyncRouteMap = [
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
			title: '首页',
			isShow: true,
			auth: true,
			icon: '',
			roles: ['root', 'admin', 'member'],
			operate_permission: [] // added in route.beforeEach base to user permission
		},
		children: []
	},
	{
		path: '/personal',
		name: 'personal',
		component: Home,
		meta: {
			title: '个人中心',
			isShow: true,
			auth: true,
			icon: '',
			roles: ['root', 'admin'],
			operate_permission: [] // added in route.beforeEach base to user permission
		},
		children: [
			{
				path: '/personal2',
				name: 'personal2',
				component: Home,
				meta: {
					title: '上传头像',
					isShow: true,
					auth: true,
					icon: '',
					roles: ['root', 'admin', 'member'],
					operate_permission: [] // added in route.beforeEach base to user permission
				}
			}
		]
	},
	{
		path: '*',
		isShow: false,
		redirect: '/404'
	}
]

export default {
	constantRouteMap,
	asyncRouteMap
}