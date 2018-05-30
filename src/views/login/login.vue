<template>
	<section class="login_wrap">
		<h4 class="title">登录</h4>
		<form class="login_info">
			<label class="form_item"><sup style="color: red; margin-right: 4px;">*</sup><span>用户名:</span><input v-model="form.account_name" class="input_item" type="text" placeholder="请输入用户名"></label>
			<label class="form_item"><sup style="color: red; margin-right: 4px;">*</sup><span>密码:</span><input v-model="form.password" class="input_item" type="password" placeholder="请输入密码"></label>
			<label class="form_item"><sup style="color: red; margin-right: 4px;">*</sup><span>确认密码:</span><input v-model="form.password2" class="input_item" type="password" placeholder="请输入密码"></label>
			<label class="form_item"><sup style="color: red; margin-right: 4px;">*</sup><span>邮箱:</span><input v-model="form.user_email" class="input_item" type="text" placeholder="请输入邮箱"></label>
			<label class="form_item"><sup style="color: red; margin-right: 4px;">*</sup><span>验证码:</span><input v-model="form.verification_code" class="input_item" type="text" placeholder="请输入验证码"><button class="btn_default" @click="get_code">获取验证码</button></label>
			<button class="btn_primary" @click="save">确定</button>
		</form>
	</section>
</template>

<script type="text/babel">
	import { userRegister, getCode } from 'api/user_info.js'

	export default {
		name: 'login',
		data () {
			return {
				form: {
					account_name: '',
					password2: '',
					password: '',
					user_email: '',
					verification_code: ''
				}
			}
		},
		methods: {
			save () {
				userRegister(this.form).then((res) => {
					this.utils.show_message({
						type: res.success === 1 ? 'success' : 'error',
						content: res.msg
					})
				})
			},
			get_code () {
				getCode(this.form.user_email).then((res) => {
					this.utils.show_message({
						type: res.success === 1 ? 'success' : 'error',
						content: res.msg
					})
				})
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.login_wrap {
		width: 440px;
		margin: 0 auto;
		margin-top: 300px;
		box-shadow: 0 0 26px #E4E7ED;
		padding: 20px;
		.title {
			margin: 0;
			padding: 10px 0;
		}
	}
	.login_info {
		margin-left: 12px;
		.form_item {
			display: block;
			margin: 10px 0;
			span {
				display: inline-block;
				width: 20%;
			}
			input {
				width: 46%;
				font-size: 15px;
			}
			button {
				margin-left: 6px;
			}
		}
	}
</style>