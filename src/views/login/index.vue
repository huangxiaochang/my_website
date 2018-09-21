<template>
	<div>
		<h-form ref="ruleForm" :model="form" :rules="rules" :labelStyle="labelStyle">
			<h-form-item label="姓名" prop="name">
				<h-input ref="input" v-model="form.name" style="height: 40px;" :clearable="true">
					<span slot="prepend">https://</span>
					<i slot="prefix" class="iconfont icon-zhankai-"></i>
					<span slot="append">.com</span>
					<i slot="suffix" class="iconfont icon-zhankai-"></i>
				</h-input>
			</h-form-item>
			<h-form-item label="密码" prop="psd">
				<h-input :rows="1" :autosize="{maxRows: 2}" resize="vertical" type="textarea" maxlength="10" v-model="form.psd" placeholder="请输入密码"></h-input>
			</h-form-item>
			<!-- <h-form-item label="姓名" prop="user.name">
				<input type="text" v-model="form.user.name" @blur="handlerBlur">
			</h-form-item> -->
			<!-- <h-form-item label="密码" prop="psd" isRequired>
				<input type="text" v-model="form.psd" @blur="handlerBlur">
			</h-form-item>
			<h-form-item label="其他" isRequired>
				<h-form-item label="邮箱" prop="email">
					<input type="text" v-model="form.email" @blur="handlerBlur">
				</h-form-item>
			</h-form-item>
			<h-form-item label="密码" :key="index" :prop="`age.${index}.value`" v-for="(item, index) in form.age" :rule="{required: true, message: 'age必填', trigger: 'blur'}">
				<input type="text" v-model="item.value" @blur="handlerBlur">
			</h-form-item> -->
		</h-form>
		<br>
		<h-button  @click="save">queding</h-button><h-button :disabled="true" type="primary" @click="resetFields">重置</h-button><h-button  type="success" @click="clearFields">清空</h-button> <h-button type="text">文字</h-button><h-button :disabled="true" type="info">文字</h-button><h-button :disabled="true" type="warn">文字</h-button><h-button type="danger">文字</h-button>
	</div>
	
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
	import emitter from 'utils/emitter.js'

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
				}
			}
		},
		mixins: [emitter],
		watch: {
			'form.name' () {
				console.log(this.form.name)
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
				console.log(this.form)
			},
			clearFields () {
				this.$refs['ruleForm'].clearFields()
				console.log(this.form)
			},
			handlerBlur () {
				this.broadcast('HFormItem', 'HForm.blur', [this])
			},
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