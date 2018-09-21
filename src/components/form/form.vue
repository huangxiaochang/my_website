<template>
	<form class="form-wrap">
		<slot></slot>
	</form>
</template>

<script type="text/babel">
	export default {
		name: 'HForm',
		componentName: 'HForm',
		data () {
			return {
				fields: [] // 收集formitem的信息
			}
		},
		provide () {
			return {
				HForm: this
			}
		},
		props: {
			model: Object,
			inline: {
				type: Boolean,
				default: false
			},
			rules: Object,
			isShowMessage: {
				type: Boolean,
				default: true
			},
			labelStyle: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		created () {
			this.$on('form.addFields', field => {
				field && this.fields.push(field)
			})
			this.$on('form.removeFields', field => {
				field.prop && this.fields.splice(this.fields.indexOf(field), 1)
			})
		},
		methods: {
			// 数据有效性检查
			validate (callback) {
				if (!this.model) {
					console.warn("model of form is required for validate to work")
					return
				}
				// 如果没有回调函数，返回一个Promise
				let promise = null
				if (typeof callback !=='function' && window.Promise) {
					promise = new Promise((resolve, reject) => {
						callback = function(valid) {
							valid ? resolve(valid) : reject(valid)
						}
					})
				}
				// 如果不存在需要检查数据有效的字段的话，直接立即返回callback
				if (this.fields.length === 0 && callback) {
					callback(true)
				}

				// 进行查找不符合数据有效性的字段
				let valid = true
				let count = 0
				this.fields.some(field => {
					// 调用form-item中的validate方法进行数据有效性检查
					field.validate('', (error) => {
						if (error) {
							valid = false
						}
						if (typeof callback === 'function' && ++count === this.fields.length) {
							callback(valid)
						}
					})
				})
				// 不存在callback的时候，返回promise
				if (promise) {
					return promise
				}
			},
			// 重置表单
			resetFields () {
				if (!this.model) {
					process.env.NODE_ENV !== 'production' && console.warn("model is required for resetFields to work")
					return
				}
				this.fields.forEach(field => {
					// 调用form-item的reseField进行重置
					field.resetField()
				})
			},
			// 清空表单
			clearFields () {
				if (!this.model) {
					process.env.NODE_ENV !== 'production' && console.warn("model is required for clearFields to work")
					return
				}
				this.fields.forEach(field => {
					// 调用form-item的reseField进行清空
					field.clearField()
				})	
			}
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$shadow-cr: #C0C4CC;
	
	.form-wrap {
		box-shadow: 0 0 8px $shadow-cr;
	}
</style>