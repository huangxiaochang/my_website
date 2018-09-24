<template>
	<li
	  class="menu-item"
	  ref="menuItem"
	  :style="{ color: itemColor, backgroundColor: backgroundClass }"
	  @mouseenter="handlerHover(1)"
	  @mouseleave="handlerHover(2)"
	  @click="handlerClick"
	  :class="{
	  	'is-active': active,
	  	'is-disabled': disabled
	  }"
	>
		<span class="menu-item-icon"><slot></slot></span>
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
				isHover: false
			}
		},
		computed: {
			itemColor() {
				if (this.active) {
					return this.rootMenu.activeColor
				} else {
					return this.color ? this.color : this.rootMenu.menuItemColor ? this.rootMenu.menuItemColor : ''
				}
			},
			backgroundClass () {
				return this.active ? this.rootMenu.activeBackground || this.backgroundColor : this.backgroundColor
			},
			hoverBgColor () {
				return this.hoverColor ? this.hoverColor : this.rootMenu.hoverColor
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
			color: String,
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
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	$defalut-height: 50px;

	.menu-item {
		white-space: nowrap;
		height: $defalut-height;
		line-height: $defalut-height;
		padding: 0 18px;
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