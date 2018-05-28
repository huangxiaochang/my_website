<template>
	<section class="login_wrap">
		<span>登录</span>
		<form class="login_info">
			<label class="form_item"><span>用户名:</span><input v-model="form.account_name" class="input_item" type="text" placeholder="请输入用户名"></label>
			<label class="form_item"><span>密码:</span><input v-model="form.password" class="input_item" type="password" placeholder="请输入密码"></label>
			<label class="form_item"><span>确认密码:</span><input v-model="form.password2" class="input_item" type="password" placeholder="请输入密码"></label>
			<label class="form_item"><span>邮箱:</span><input v-model="form.user_emit" class="input_item" type="text" placeholder="请输入邮箱"></label>
			<label class="form_item"><span>验证码:</span><input v-model="form.verification_code" class="input_item" type="text" placeholder="请输入验证码"><button class="btn_default">获取验证码</button></label>
			<button class="btn_primary" @click="save">确定</button>
		</form>
	</section>
</template>

<script type="text/babel">
	import { userRegister } from 'api/user_info.js'

	export default {
		name: 'login',
		data () {
			return {
				form: {
					account_name: '',
					password2: '',
					password: '',
					user_emit: '',
					verification_code: ''
				}
			}
		},
		methods: {
			save () {
				userRegister(this.form).then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.login_wrap {
		width: 400px;
		margin: 0 auto;
	}
	.login_info {
		.form_item {
			display: block;
			margin: 10px 0;
			span {
				display: inline-block;
				width: 20%;
			}
			input {
				width: 46%;
			}
			button {
				margin-left: 6px;
			}
		}
	}
</style>