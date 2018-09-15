<template>
	<my-form></my-form>
	<!-- <section class="login-wrap">
		<input type="text" v-model="form.name">
		<input type="password" v-model="form.psd">
		<br>
		<button @click="login">登录</button>
		<button @click="loginOut">退出登录</button>
		<br>
		用户名<input type="text" v-model="registion.account_name">
		密码<input type="password" v-model="registion.password">
		邮箱<input type="text" v-model="registion.user_email">
		验证码<input type="text" v-model="registion.verification_code">
		<button @click="get_code(registion.user_email)">获取验证码</button>
		<button @click="user_registion">注册</button>
		
		<br>
		<button @click="get_user_info">获取用户信息</button>
		<img :src="`${utils.server_path()}${user_info.avatar_url}`" alt="">
		<br>
		<input type="file" name="" @change="handlerChange">
		<button @click="upload">确定上传</button>

		<router-link :to="{path: '/home'}">首页</router-link>
		<br><br>
		用户名<input type="text" v-model="modify_form.name">
		密码<input type="password" v-model="modify_form.password">
		<br>用户角色<br>
		<input type="checkbox" name="role" value="root" v-model="modify_form.roles">root
		<input type="checkbox" name="role" value="admin" v-model="modify_form.roles">admin
		<input type="checkbox" name="role" value="member" v-model="modify_form.roles">member

		<br>用户操作权限<br>
		<input type="checkbox" name="operate_permission" value="add" v-model="modify_form.operate_permission">add
		<input type="checkbox" name="operate_permission" value="del" v-model="modify_form.operate_permission">del
		<input type="checkbox" name="operate_permission" value="edit" v-model="modify_form.operate_permission">edit
		<input type="checkbox" name="operate_permission" value="look" v-model="modify_form.operate_permission">look
		邮箱<input type="text" v-model="modify_form.email">
		验证码<input type="text" v-model="modify_form.code">
		<button @click="get_code(modify_form.email)">获取验证码</button>
		<button @click="modify_user_info(1)">修改用户信息</button>
		<button @click="modify_user_info(2)">修改其他用户信息</button>

		<br><br><br><br><br>
		<button @click="export_user_info">导出用户信息</button>
	</section> -->
</template>

<script type="text/babel">
	import { userLogin, get_user_info, login_out, upload_avatar, register, get_code, modify_user_info } from 'api/login.js'

	export default {
		name: 'login',
		data () {
			return {
				form: {
					name: '',
					psd: ''
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
				}
			}
		},
		methods: {
			login () {
				userLogin(this.form).then((res) => {
					console.log(res)
					this.$router.push({
						path: 'home'
					})
				})
			},
			get_user_info () {
				get_user_info().then((res) => {
					console.log(res, 'info')
					this.user_info = res
				})
			},
			loginOut () {
				login_out().then((res) => {
					console.log(res)
				})
			},
			handlerChange (ev) {
				console.log(ev.target.files, 'file')
				let files = ev.target.files
				this.form_data = new FormData()
				this.form_data.append('file_name', files[0].name)
				this.form_data.append('file', files[0])
			},
			upload () {
				console.log(this.form_data, 4455)
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