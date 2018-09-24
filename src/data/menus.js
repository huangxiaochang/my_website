const menus = [
	{
		path: '/personal_center',
		icon: 'iconfont icon--tongjibiao',
		name: '个人中心',
		isShow: true,
		children: []
	},
	{
		path: '/home',
		icon: 'iconfont icon-tongji',
		name: '设备统计',
		isShow: true,
		children: [
			{
				path: '/device_borrow',
				icon: '',
				name: '设备借用统计',
				isShow: true
			}
		]
	},
]

export default menus