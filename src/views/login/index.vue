<template>
	<h-menu router menuItemColor="#fff" backgroundColor="#515354" defaultActive="">
		<h-menu-item index="1" disabled>
			<i class="iconfont icon-success"></i>
			<span slot="title">菜单1</span>
		</h-menu-item>
		<h-menu-item index="2" :route="{path: '/403', query: {name: 'hxc'}}">
			<i class="iconfont icon-info"></i>
			<span slot="title">菜单2</span>
		</h-menu-item>
		<h-menu-item index="/404">
			<i class="iconfont icon-error"></i>
			<span slot="title">菜单3</span>
		</h-menu-item>
	</h-menu>
</template>

<script type="text/babel">
	import { userLogin, get_user_info, login_out, upload_avatar, register, get_code, modify_user_info } from 'api/login.js'
	import emitter from 'utils/emitter.js'
	import Notification from '@/components/notification/notification.js'
	import menus from '@/data/menus.js'

	export default {
		name: 'login',
		data () {
			const name_validator = function (rule, value, callback) {
				// 对于需要验证的是数组部位空，要自定义validator来进行
				if (value.length === 0) {
					callback('名字不能等于11')
				}
				callback()
			}
			return {
				menu_list: menus,
				rules: {
					'user.name': {required: true, message: '姓名必填111', trigger: 'blur', validator: name_validator},
					name: [
						{ required: true, message: '姓名必填', trigger: 'blur'},
						{ required: true, message: '姓名不能为11', trigger: 'change', validator: name_validator}
					],
					psd: [{required: true, message: '密码必填', trigger: 'blur'}],
					email: {required: true, message: '邮箱必填', trigger: 'blur'}
				},
				form: {
					user: {
						name: ['777']
					},
					name: '123',
					psd: '21fasdfsaghret撒旦法鲨的撒发生高峰期去饭堂更范德萨',
					email: '67',
					age: [{value: ''}, {value: '67'}]
				},
				labelStyle: {
					width: '80px',
					display: 'inline-block',
					textAlign: 'left'
				},
				registion: {
					account_name: '',
					password: '',
					user_email: '',
					verification_code: ''
				},
				user_info: {
					avatar_url: ''
				},
				form_data: null,
				modify_form: {
					user_id: 0,
					name: '',
					email: '',
					code: '',
					password: '',
					roles: [],
					operate_permission: []
				},
				count: 1
			}
		},
		mixins: [emitter],
		watch: {
			'form.name' () {
				
			}
		},
		mounted () {
			// this.$refs.input.focus()
		},
		methods: {
			save() {
				// this.$refs['ruleForm'].validate((valid) => {
				// 	console.log(valid, 'valid')
				// 	if (valid) {
				// 		console.log('验证通过')
				// 	} else {
				// 		console.log('数据不符合要求')
				// 	}
				// })
				console.log(this.form)
				this.$refs['ruleForm'].validate().then(() => {
					console.log('验证通过')
				}).catch(() => {
					console.log('数据不符合要求')
				})
			},
			resetFields () {
				this.$refs['ruleForm'].resetFields()
			},
			clearFields () {
				this.$refs['ruleForm'].clearFields()
			},
			showNotification () {
				/*
				this.$notify({
					type: 'success',
					title: `这是第${this.count++}段提示信息`,
					message: 'asda<br>hhh',
					isUseHTMLString: true,
					autoClose: true,
					isShowCloseBtn: true,
					position: 'top-right'
				})
				*/
				//this.$notify.success('sfd<br>fsd')
				new Notification({
					type: 'success',
					title: `这是第${this.count++}段提示信息`,
					message: 'asda<br>hhh',
					isUseHTMLString: true,
					autoClose: true,
					isShowCloseBtn: true,
					position: 'top-right'
				})
			},
			login () {
				userLogin(this.form).then((res) => {					this.$router.push({
						path: 'home'
					})
				})
			},
			get_user_info () {
				get_user_info().then((res) => {
					this.user_info = res
				})
			},
			loginOut () {
				login_out().then((res) => {
				})
			},
			handlerChange (ev) {
				let files = ev.target.files
				this.form_data = new FormData()
				this.form_data.append('file_name', files[0].name)
				this.form_data.append('file', files[0])
			},
			upload () {
				upload_avatar(this.form_data).then((res) => {
					console.log(res)
				})
			},
			get_code (email) {
				get_code(email).then((res) => {
					console.log(res, 'code')
				})
			},
			user_registion () {
				register(this.registion).then((res) => {
					console.log(res)
				})
			},
			modify_user_info (type) {
				if (type === 2) {
					this.modify_form.user_id = 1
				}
				modify_user_info(this.modify_form).then((res) => {
					console.log(res)
				})
			},
			export_user_info () {
				this.utils.exportFile('/user_info/export_user_info')
			}
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	
</style>