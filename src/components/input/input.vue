<template>
	<div class="input-wrap" ref="inputWrap">
		<textarea	
		  v-if="type === 'textarea'"
		  ref="textarea"
		  class="textarea-inner"
		  v-bind="$attrs"
		  :rows="rows"
		  :cols="cols"
		  :value="currentValue"
		  :disabled="disabled"
		  :tabindex="tabindex"
		  :style="textareaStyle"
		  @compositionstart="handleComposition($event, 'start')"
	      @compositionupdate="handleComposition($event, 'update')"
	      @compositionend="handleComposition($event, 'end')"
	      @input="handlerInput"
		  @focus="handlerFocus"
		  @change="handleChange"
		  @blur="handlerBlur"
		>
		</textarea>
		<template v-else>
			<div class="input-prepend" v-if="$slots.prepend" :style="{lineHeight: lineHeight}">
				<slot name="prepend"></slot>
			</div>
			<span class="input-prefix" v-if="$slots.prefix">
				<slot name="prefix"></slot>
			</span>
			<input 
			ref="input"
			class="input-inner" 
			:value="currentValue"
			:type="type" 
			v-if="type !=='textarea'"
			:tabindex="tabindex"
			v-bind="$attrs"
			:disabled="disabled"
			:autoComplete="autoComplete"
			@compositionstart="handleComposition($event, 'start')"
	        @compositionupdate="handleComposition($event, 'update')"
	        @compositionend="handleComposition($event, 'end')"
			@input="handlerInput"
			@focus="handlerFocus"
			@change="handleChange"
			@blur="handlerBlur"
			@mouseenter="isShowClearBtn = true"
			@mouseleave="isShowClearBtn = false"
			:class="{'hover-border': isShowClearBtn}"
			:style="{paddingLeft: $slots.prefix ? '22px': '', paddingRight: $slots.suffix ? '22px': ''}"
			>
			<span class="input-suffix" v-if="$slots.suffix || clearable">
				<span class="clearable" @click="clear" @mouseenter="isShowClearBtn = true" v-if="clearable && isShowClearBtn">x</span>
				<slot name="suffix" v-else></slot>
			</span>
			<div class="input-append" v-if="$slots.append" :style="{lineHeight: lineHeight}">
				<slot name="append"></slot>
			</div>
		</template>
	</div>
</template>

<script type="text/babel">
	import emitter from 'utils/emitter.js'
	import calcTextareaHeight from './calcTextareaHeight.js'

	export default {
		name: 'HInput',
		mixins: [emitter],
		props: {
			type: {
				type: String,
				default: 'text'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			autoComplete: {
				type: String,
				default: 'off'
			},
			tabindex: String,
			value: [String, Number],
			clearable: Boolean,
			rows: {
				type: Number,
				default: 3
			},
			cols: {
				type: Number,
				default: 20
			},
			resize: String,
			autosize: {
				type: Boolean|Object,
				default: false
			}
		},
		data () {
			return {
				currentValue: this.value === undefined || this.value === null ? '' : this.value,
				composition: false,
				lineHeight: 0,
				isShowClearBtn: false,
				calcStyle: {}
			}
		},
		computed: {
			textareaStyle () {
				return {resize: this.resize, ...this.calcStyle}
			}
		},
		watch: {
			// value发生变化的时候,要重置input的value
			value (newVal, oldVal) {
				this.setCurrentValue(newVal)
			}
		},
		mounted () {
			this.lineHeight = this.$refs.inputWrap.style.height
			this.resizeHeight()
		},
		methods: {
			// 提供手动设置input进行focus的功能
			focus () {
				(this.$refs.input || this.$refs.textarea).focus()
			},
			blur () {
				(this.$refs.input || this.$refs.textarea).blur()
			},
			setCurrentValue (value) {
				this.currentValue = value
				this.dispatch('HFormItem', 'HForm.change', [value])
			},
			resizeHeight () {
				if (this.$isServer || this.type !== 'textarea' || !this.autosize) return
				const minRows = this.autosize.minRows
        		const maxRows = this.autosize.maxRows

        		this.calcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
        		console.log(this.calcStyle, '000')

			},
			handlerInput (ev) {
				let value = ev.target.value
				if (this.composition) { return }
				// 要手动设置input的value
				this.setCurrentValue(value)
				this.$nextTick(_ => {
					this.resizeHeight()
				})
				// 触发input事件，即可在父级组件中v-model中获取到值，具体v-model机制详情见vuejs的v-model
				this.$emit('input', value)
			},
			handlerFocus (ev) {
				this.$emit('focus', ev)
			},
			handleChange (ev) {
				this.$emit('change', ev)
			},
			handlerBlur(ev) {
				this.$emit('blur', ev)
				this.dispatch('HFormItem', 'HForm.blur', [ev.target.value])
			},
			/* 兼容中文输入，即在还没有正式选择输入的中文时(在还是输入的是拼音的阶段) 
				不触发input事件
			*/
			handleComposition (ev, type) {
				if (type === 'end') {
					this.composition = false
					this.handlerInput(ev)
				} else {
					this.composition = true
				}
			},
			clear () {
				this.$emit('input', '')
		        this.$emit('change', '')
		        this.$emit('clear')
		        this.setCurrentValue('')
		        this.focus()
			}
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$border-color: #dcdfe6!default;
	$error-border-color: #f56c6c;
	$focus-border-color: #409EFF;
	$hover-border-color: #909399;
	$prepend-append-bg-color: #F2F6FC;

	.input-wrap {
		font-size: 0;
		position: relative;
		width: 100%;
		.input-inner, .textarea-inner {
			height: 100%;
			box-sizing: border-box;
			outline: none;
			border: 1px solid $border-color;
			padding: 6px;
			font-size: 16px;
			&:focus {
				border-color: $focus-border-color;
			}
			&.hover-border {
				border-color: $hover-border-color;
			}
		}
		.input-prepend, .input-append {
			height: 100%;
			display: inline-block;
			font-size: 16px;
			padding: 0 8px;
			border: 1px solid $border-color;
			vertical-align: top;
			background-color: $prepend-append-bg-color;
			white-space: nowrap;
			box-sizing: border-box;
		}
		.input-prepend {
			border-right: none;
		}
		.input-append {
			border-left: none;
		}
		.input-prefix, .input-suffix {
			font-size: 16px;
			position: absolute;
			width: 14px;
			height: 14px;
			overflow: hidden;
			top: 50%;
			margin-top: -7px;
			z-index: 100;
		}
		.input-prefix {
			margin-left: 6px;
		}
		.input-suffix {
			margin-left: -20px;
			.clearable {
				display: inline-block;
				position: absolute;
				left: 0;
				bottom: 0;
				top:0;
				right: 0;
				height: 14px;
				line-height: 14px;
				text-align: center;
				background-color: #909399;
				color: #fff;
				border-radius: 50%;
				cursor: pointer;
				z-index: 200;
			}
		}
	}
	/* when form-item add is-error class, this css is work, note: if this is added in form-item 
		,it no to work because of component loading order
	*/
	.is-error{
		.input-inner, .textarea-inner {
			border-color: $error-border-color;
		}
	}
</style>