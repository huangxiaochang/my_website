<template>
	<h-form class="form-wrap" :model="form" ref="form" :rules="rules" :label-style="{width: '84px'}">
		<h-form-item label="用户名" prop="name">
			<h-input v-model="form.name"></h-input>
		</h-form-item>
		<h-form-item label="密码" prop="password1">
			<h-input v-model="form.password1"></h-input>
		</h-form-item>
		<h-form-item label="确认密码" prop="password2">
			<h-input v-model="form.password2"></h-input>
		</h-form-item>
		<h-form-item label="邮箱" prop="email">
			<h-input v-model="form.email"></h-input>
		</h-form-item>
		<h-form-item label="验证码" prop="code">
			<h-input v-model="form.code"></h-input>
		</h-form-item>
		<h-button style="width: 100px;margin-left: 90px;" type="primary" @click="register">注册</h-button>
		<span style="margin-left: 30px;">已有账号?<h-button type="text" @click="to_login">登录</h-button></span>
	</h-form>
</template>

<script type="text/babel">
	import {  register, get_code } from 'api/login.js'

	export default {
		name: 'register',
		data () {
			let form_data = {
				name: '',
				email: '',
				code: '',
				password1: '',
				password2: '',
				password: ''
			}
			let validator = function (rule, value, callback) {
				if (value !== form_data.password1) {
					callback('密码不一致')
				}
				callback()
			}
			return {
				form: form_data,
				rules: {
					name: {required: true, message: '请填写用户名', trigger: 'blur'},
					password1: {required: true, message: '请输入密码', trigger: 'blur'},
					password2: {required: true, message: '密码不一致', trigger: 'blur', validator: validator},
					email: {required: true, message: '请输入邮箱', trigger: 'blur'},
					code: {required: true, message: '请输入验证码', trigger: 'blur'},
				}
			}
		},
		methods: {
			register () {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.form.password = this.form.password2
						register(this.form).then((res) => {
							if (res.success === 1) {
								this.$router.push({
									path: '/login'
								})
							} else {
								this.$notify.warning(res.msg)
							}
						})
					}
				})
			},
			to_login () {
				this.$router.push({
					path: '/login'
				})
			}
		}
	}	
</script>

<style type="text/scss" lang="scss" scoped>
	.form-wrap {
		position: absolute;
		width: 400px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -68%);
	}
</style>
