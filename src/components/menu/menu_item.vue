<template>
	<li
	  class="menu-item"
	  ref="menuItem"
	  :style="{ color: itemColor, backgroundColor: backgroundClass, paddingLeft: paddingLeft + 'px'}"
	  @mouseenter="handlerHover(1)"
	  @mouseleave="handlerHover(2)"
	  @click="handlerClick"
	  :class="{
	  	'is-active': active,
	  	'is-disabled': disabled
	  }"
	>
		<span class="menu-item-icon" v-if="$slots.default"><slot></slot></span>
		<slot name="title"></slot>
	</li>
</template>

<script type="text/babel">
	import emitter from 'utils/emitter.js'

	export default {
		name: 'HMenuItem',
		inject: ['rootMenu'],
		mixins: [emitter],
		data () {
			return {
				paddingLeft: 20
			}
		},
		computed: {
			itemColor() {
				if (this.active) {
					return this.$parent.activeColor || this.rootMenu.activeColor
				} else {
					return this.textColor || this.$parent.textColor || this.rootMenu.textColor || ''
				}
			},
			backgroundClass () {
				return this.active ? this.rootMenu.activeBackground || this.backgroundColor : this.backgroundColor || this.$parent.subBackgroundColor || this.rootMenu.backgroundColor
			},
			hoverBgColor () {
				if (this.active) { return }
				return this.hoverColor || this.rootMenu.hoverColor
			},
			active () {
				return this.index === this.rootMenu.activeIndex
			}
		},
		props: {
			backgroundColor: {
				type: String,
				default: ''
			},
			hoverColor: String,
			textColor: String,
			index: {
				type: String,
				required: true
			},
			route: [String, Object],
			disabled: {
				type: Boolean,
				default: false
			}
		},
		mounted () {
			if (this.$parent.$options.componentName === 'HSubMenu') {
				this.paddingLeft = this.$parent.paddingLeft + 20
				this.$parent.addItem(this)
			}
			this.rootMenu.addItem(this)
		},
		methods: {
			handlerHover (type) {
				if (this.active) { return }
				this.$refs.menuItem.style.background = type === 1 ? this.hoverBgColor : this.backgroundColor
			},
			handlerClick () {
				if (!this.disabled) {
					this.dispatch('HMenu', 'item-click', this)
					this.$emit('click', this)
				}
			}
		},
		beforeDestroy () {
			this.rootMenu.removeItem(this)
			if (this.$parent.$options.componentName === 'HSubMenu') {
				this.$parent.removeItem(this)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	$defalut-height: 50px;

	.menu-item {
		white-space: nowrap;
		height: $defalut-height;
		line-height: $defalut-height;
		font-size: 16px;
		padding-right: 14px;
		&:hover {
			cursor: pointer;
		}
		&.is-disabled {
			cursor: not-allowed;
			opacity: .5;
			&:hover {
				background: none !important;
			}
		}
		.menu-item-icon {
			display: inline-block;
			margin-right: 6px;
			vertical-align: middle;
		}
	}
</style>