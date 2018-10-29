<template>
	<h-form ref="ruleForm" class="form-wrap" :model="login_form" :rules="login_rules" labelWidth="76px" labelAlign="right">
		<h-form-item label="用户名" prop="name">
			<h-input type="text" v-model="login_form.name"></h-input>
		</h-form-item>
		<h-form-item type="password" label="密码" prop="password">
			<h-input type="password" v-model="login_form.password"></h-input>
		</h-form-item>
		<h-form-item label="验证码" prop="code" style="width: 100%;">
			<h-input v-model="login_form.code"></h-input>
			<img class="captcha_img" :src="captcha_url" @click="getCaptcha" alt="验证码">
		</h-form-item>
		<h-button style="width: 100px;margin-left: 90px;" type="primary" @click="login">登录</h-button>
		<span style="margin-left: 30px;">还没账号?<h-button type="text" @click="to_register">注册</h-button></span>
	</h-form>
</template>

<script type="text/babel">
	import { userLogin, getCaptcha } from 'api/login.js'

	export default {
		name: 'login',
		data () {
			const password_validator = function (rule, value, callback) {
				// 对于需要验证的是数组部位空，要自定义validator来进行
				if ((/\s+/g.test(value))) {
					callback('密码不能有空格')
				}
				callback()
			}
			return {
				login_form: {
					name: '',
					password: '',
					code: ''
				},
				login_rules: {
					name: [
						{ required: true, message: '请填写用户名', trigger: 'blur'}
					],
					password: [
						{required: true, message: '密码必填', trigger: 'blur'},
						{min: 6, max: 18, trigger: 'change', validator: password_validator}
					],
					code: {
						required: true, message: '验证码必填', trigger: 'blur'
					}
				},
				captcha_url: ''
			}
		},
		mounted () {
			this.getCaptcha()
		},
		methods: {
			getCaptcha () {
				getCaptcha().then(res => {
					this.captcha_url = res.url
				})
			},
			login() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						userLogin(this.login_form).then((res) => {
							if (res.success === 1) {
								this.$router.push({
									path: '/home'
								})
							} else {
								this.$notify.warning(res.msg)
							}
						})
					}
				})
			},
			to_register () {
				this.$router.push({
					path: '/register'
				})
			}
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	.form-wrap {
		position: absolute;
		width: 400px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -68%);
		.captcha_img {
			vertical-align: top;
			margin-left: 6px;
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>