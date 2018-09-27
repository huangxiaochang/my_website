<template>
	<label :class="{'is-error': invalid === true}" class="form-item" :style="{display: HForm.inline ? 'inline-block' : 'block'}">
		<span v-if="label !== undefined" class="item-label" :style="labelStyle"><sup class="required-item" v-if="required">*</sup><slot name="label">{{ label }}</slot></span>
		<div class="item-content" :style="{width: contentWidth}">
			<slot></slot>
			<transition name="fade">
				<div class="tip" v-if="invalid && isShowMessage && HForm.isShowMessage">
					{{ invalidMesage }}
				</div>
			</transition>
		</div>
	</label>
</template>

<script type="text/babel">
	import AsyncValidator from 'async-validator'
	import emitter from 'utils/emitter.js'
	
	export default {
		name: 'HFormItem',
		componentName: 'HFormItem',
		inject: ['HForm'],
		mixins: [emitter],
		props: {
			label: String,
			prop: String|Array,
			rule: Object|Array,
			isShowMessage: {
				type: Boolean,
				default: true
			},
			isRequired: {
				type: Boolean,
				default: undefined
			}
		},
		data () {
			return {
				invalid: false,
				invalidMesage: ''
			}
		},
		computed: {
			required () {
				let flag = false
				const rules = this.getRules()
				if (Array.isArray(rules)) {
					rules.some((rule) => {
						if (rule.required) {
							flag = true
							return true
						}
					})
				} else {
					flag = rules && rules.required
				}
				return this.isRequired || flag
			},
			labelStyle () {
				return {
					width: this.HForm.labelWidth,
					textAlign: this.HForm.labelAlign,
					display: this.HForm.labelPosition === 'left' ? 'inline-block' : 'block'
				}
			},
			contentWidth () {
				let wd = this.HForm.labelWidth.match(/^(\d+)(px|%)/)
				return `calc(100% - (6px + ${wd[1]}${wd[2]})`
			}
		},
		methods: {
			// 进行使用async-validator进行数据的格式检查,该方法会在父级组件form-wrap中被调用
			validate (trigger, callback) {
				let rules = this.getRules()
				// 对于不需要进行格式检查的字段，直接验证通过
				if ((!rules || rules.length === 0) && this.isRequired === true) {
					console.warn("if 'isRequired=true' of form-item, validate rule is required")
					callback(`请设置验证规则`)
					return true
				}

				if ((!rules || rules.length === 0) && this.isRequired === false) {
					callback()
					return true
				}

				// 对rules按照trigger进行过滤
				if (Array.isArray(rules)) {
					rules = rules.filter(rule => {
						if (!trigger || trigger === '') { return true}
						return rule.trigger === trigger
					})
				} else {
					if (trigger !== '' && rules.trigger !== trigger) {
						return
					}
				}
				// 使用AsyncValidator来进行格式的检查
				const descriptor = {}
				let validator_model = this.getPropByPath()
				descriptor[validator_model.key] = rules
				let validator = new AsyncValidator(descriptor)
				// 根据prop获取form的model中相应的值
				validator.validate(validator_model.model, (errors) => {
					if (errors) {
						this.invalid = true
						this.invalidMesage = errors[0].message
					} else {
						this.invalid = false
						this.invalidMesage = ''
					}
					callback(errors)
				})
			},
			// 通过prop进行获取AsyncValidator的descriptor和model
			getPropByPath () {
				if (!this.HForm.model) {
					return {}
				}
				let keys = this.prop.split('.')
				let obj = this.HForm.model
				let i = 0 
				for (; i< keys.length - 1; i++) {
					obj = obj[keys[i]]
				}
				return {
					model: obj,
					key: keys[i]
				}
			},
			// 重置并移除数据有效性检查
			resetField () {
				this.invalid = false
				this.invalidMesage = ''
				let obj = this.getPropByPath()
				obj.model[obj.key] = this.initialValue
			},
			// 清空
			clearField () {
				this.invalid = false
				this.invalidMesage = ''
				let obj = this.getPropByPath()
				if (Array.isArray(this.initialValue)) {
					obj.model[obj.key] = []
				}  else if (this.utils.isPlainObject(this.initialValue)) {
					obj.model[obj.key] = {}
				} else {
					obj.model[obj.key] = ''
				}
			},
			// 获取该form-item绑定的有效性检查规则
			getRules ()  {
				if (!this.prop) {
					return {}
				}
				let rules = []
				let form_rule = this.HForm.rules[this.prop]
				if (this.rule) {
					if(Array.isArray(this.rule)) {
						rules= rules.concat(this.rule)
					} else {
						rules.push(this.rule)
					}
				}
				if (form_rule) {
					if (Array.isArray(form_rule)) {
						rules = rules.concat(form_rule)
					} else {
						rules.push(form_rule)
					}
				}
				return rules
			},
			onFieldBlur () {
				this.validate('blur', function(){})
			},
			onFieldChange () {
				this.validate('change', function(){})
			}
		},
		mounted () {
			// 只有在form-item中绑定了prop字段是才进行数据有效性检查
			if (this.prop) {
				this.dispatch('HForm', 'form.addFields', [this])
				// 存储初始值，resetField是用到
				let obj = this.getPropByPath()
				Object.defineProperty(this, 'initialValue', {value: obj.model[obj.key]})

				// 处理触发有效性检查的trigger,由于triggrt的触发规则，AsyncValidator没有实现，所以只能
				// 通过自己封装实现，即要在input， select标签中定义blur,change进行使用broadcast进行emit事件HForm.blur和HForm.change事件
				this.$on('HForm.blur', this.onFieldBlur)
				this.$on('HForm.change', this.onFieldChange)
			}
		},
		beforeDestroy () {
			// 在form-item销毁之前清除form中的需要有效性检查
			this.dispatch('HForm', 'form.removeFields', [this])
		}
	}
</script>

<style type="test/scss" lang="scss" scoped>
	$--md-fade-transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) !default;
	$error-border-color: #f56c6c;

	.form-item {
		padding: 6px;
		font-size: 0;
		.item-label {
			display: inline-block;
			font-size: 16px;
			padding-bottom: 4px;
			padding-right: 6px;
		}
		.required-item {
			color: red;
			padding: 0 4px;
		}
		.item-content {
			display: inline-block;
			font-size: 16px;
			padding-bottom: 20px;
			position: relative;
			.tip {
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 14px;
				color: red;
			}
		}
		
	}
	.fade-enter-active, .fade-leave-active {
		opacity: 1;
  		transform: scaleY(1);
  		transition: $--md-fade-transition;
  		transform-origin: center top;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
  		transform: scaleY(0);
	}
</style>